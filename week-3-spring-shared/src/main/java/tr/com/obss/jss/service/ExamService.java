package tr.com.obss.jss.service;

import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import tr.com.obss.jss.entity.Answer;
import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.Question;
import tr.com.obss.jss.entity.Result;
import tr.com.obss.jss.entity.User;
import tr.com.obss.jss.model.*;
import tr.com.obss.jss.repo.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ExamService implements ExamDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private AnswerRepository answerRepository;

    public Exam save(ExamDTO examDto) {
        Exam exam = new Exam();
        exam.setName(examDto.getName());
        exam.setStartDate(examDto.getStartDate());
        exam.setEndDate(examDto.getEndDate());
        exam.setQuestions(new ArrayList<>());
        exam.setResults(new ArrayList<>());
        String r = RandomString.make(10);
        String url = "/api/exams/startExam/exam" + r;
        exam.setUrl(url);
        Optional<User> owner = userRepository.getById(Long.parseLong(examDto.getOwnerId()));

        if (owner.isPresent()) {
            exam.setOwner(owner.get());
            List<QuestionDTO> questionDTO = examDto.getQuestions();

            for (QuestionDTO aQuestionDTO : questionDTO) {
                Question question = new Question();
                question.setQuestionText(aQuestionDTO.getQuestionText());
                question.setPoint(aQuestionDTO.getPoint());
                question.setPossibleAnswers(aQuestionDTO.getPossibleAnswers());
                question.setPenaltyPoint(aQuestionDTO.getPenaltyPoint());
                question.setExam(exam);
                exam.getQuestions().add(question);
            }

            return examRepository.save(exam);
        }
        throw new IllegalArgumentException("Owner not found");
    }

    public Result submitExam(List<AnswerDTO> answers) {
        int totalPoints = 0;
        long studentId;
        long examId = 8;
        long questionId = 0;
        boolean isAnswer;

        Exam theExam = null;
        Question question;

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        studentId = userRepository.findByUsername(username).get().getId(); // DANGER

        for (AnswerDTO answer : answers) {

            Optional<Answer> aOptional = answerRepository.findById(answer.getAnswerId());
            if (aOptional.isPresent()) {
                Answer theAnswer = aOptional.get();
                isAnswer = theAnswer.isAnswer();
                question = questionRepository.findById(answer.getQuestionId()).get();
                questionId = question.getId();
                if (isAnswer) {
                    totalPoints += Integer.parseInt(question.getPoint());

                } else {
                    totalPoints -= Integer.parseInt(question.getPenaltyPoint());
                }
            }

        }
        //if points lower then 0 => set points to 0
        Result result = new Result();
        result.setGrade(totalPoints);
        result.setStudent(userRepository.findById(studentId).get());
        Result returnResult = resultRepository.save(result);

        if (questionId != 0) {
            Optional<Question> qOptional = questionRepository.findById(questionId);
            if (qOptional.isPresent()) {
                Exam exam = qOptional.get().getExam();
                result.setExam(exam);
                exam.getResults().add(result);
                examRepository.save(exam);
            }
        }

        Optional<User> studentOptional = userRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            User student = studentOptional.get();
            student.getResults().add(result);
            userRepository.save(student);
        }
        return returnResult;
    }

    public Page<Exam> getCurrentExams(int pageSize, int pageNumber){
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return examRepository.findByStartBeforeAndEndAfter(paged);
    }

    public Page<String> getCurrentExamsUrl(int pageSize, int pageNumber){
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return examRepository.findUrlByStartBeforeAndEndAfter(paged);
    }

    public Page<Exam> findAll(int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return examRepository.findAll(paged);
    }

    public Optional<Exam> findById(long id) {
        Optional<Exam> exam = examRepository.getByIdNative(id);

        return exam;
    }

    public Optional<Exam> findByUrl(String url) {
        return examRepository.findByUrl(url);
    }

    public Optional<Exam> findByName(String name) {
        return examRepository.findByNameStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(name);
    }

    public Exam update(long id, ExamUpdateDTO dto) {
        Optional<Exam> byId = examRepository.findById(id);
        if (byId.isPresent()) {
            Exam exam = byId.get();
            return examRepository.save(exam);

        }
        throw new IllegalArgumentException("Sınav bulunamadı.");
    }

    public Exam delete(long id) {
        Optional<Exam> byId = examRepository.findById(id);
        if (byId.isPresent()) {
            Exam exam = byId.get();
            exam.setActive(!exam.isActive());
            return examRepository.save(exam);
        }
        throw new IllegalArgumentException("Sınav bulunamadı.");
    }

    // merhabalar arkadaşlar
    // nasilsiniz

    @Override
    public ExamDetails loadExamByOwner(String name) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(name);
        if (byUsername.isPresent()) {
            return new MyExamDetails(byUsername.get());
        }
        throw new UsernameNotFoundException("Kullanıcı bulunamadı");
    }
}

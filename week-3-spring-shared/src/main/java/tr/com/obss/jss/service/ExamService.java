package tr.com.obss.jss.service;

import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.Question;
import tr.com.obss.jss.entity.User;
import tr.com.obss.jss.model.*;
import tr.com.obss.jss.repo.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
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

    public Exam save(ExamDTO examDto) {
        Exam exam = new Exam();
        exam.setName(examDto.getName());
        exam.setStartDate(examDto.getStartDate());
        exam.setEndDate(examDto.getEndDate());
        exam.setQuestions(new ArrayList<>());
        exam.setResults(new ArrayList<>());
        Random random = new Random();
        String r = RandomString.make(10);
        int uniqueURL = random.nextInt(13983816);
        String url = "/api/exams/startExam/exam" + r;
    //    String url = "/api/exams/startExam/exam" + Integer.toString(uniqueURL);
        exam.setUrl(url);
     //   exam.setUrl(examDto.getUrl()); //create random unique url here
        Optional<User> owner = userRepository.getById(Long.parseLong(examDto.getOwnerId()) );

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

    public Page<Exam> findAll(int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return examRepository.findAll(paged);
    }

    public Optional<Exam> findById(long id) {
        return examRepository.getByIdNative(id);
    }

    public List<Exam> findByName(String name) {
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

    @Override
    public ExamDetails loadExamByOwner(String name) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(name);
        if (byUsername.isPresent()) {
            return new MyExamDetails(byUsername.get());
        }
        throw new UsernameNotFoundException("Kullanıcı bulunamadı");
    }
}

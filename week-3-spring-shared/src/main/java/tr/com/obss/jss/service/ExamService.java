package tr.com.obss.jss.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.User;
import tr.com.obss.jss.model.*;
import tr.com.obss.jss.repo.*;

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

    public Exam save(ExamDTO examDto) {
        Exam exam = new Exam();
        exam.setName(examDto.getName());
        exam.setStartDate(examDto.getStartDate());
        exam.setEndDate(examDto.getEndDate());
        exam.setOwner(examDto.getOwner());
   //   exam.setOwner(Stream.of(roleRepository.findByName("ROLE_INSTRUCTOR")).collect(Collectors.toSet()));
        exam.setQuestions(examDto.getQuestions());
    //    exam.setQuestions(Stream.of(questionRepository.findById("EXAM_ID")).collect(Collectors.toSet()));
        exam.setUrl(examDto.getUrl());
        Exam savedExam = examRepository.save(exam);
        return savedExam;
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

package tr.com.obss.jss.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.User;
import tr.com.obss.jss.model.ExamDTO;
import tr.com.obss.jss.model.ExamUpdateDTO;
import tr.com.obss.jss.service.ExamService;
import tr.com.obss.jss.service.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exams")
public class ExamController {
    private ExamService examService;
    private UserService userService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(ExamController.class);

    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name="pageSize", defaultValue = "2") int pageSize,
                                 @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(examService.findAll(pageSize, pageNumber));
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> get(@PathVariable long id) {
        Optional<Exam> examOptional = examService.findById(id);
        if (examOptional.isPresent()) {
            return ResponseEntity.ok(examOptional.get());
        }
        throw new IllegalArgumentException("Sınav bulunamadı.");
    }

    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "username", defaultValue = "") String username) {
        List<User> userList = userService.findByUsername(username);
        return ResponseEntity.ok(userList);
    }

 /*   @GetMapping("/has-role-user")
    @ResponseBody
    public ResponseEntity<?> findByRoles() {
        List<User> userList = userService.findByRoles(Arrays.asList("ROLE_STUDENT"));
        return ResponseEntity.ok(userList);
    }*/

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody ExamUpdateDTO examDTO) {
        Exam exam = examService.update(id, examDTO);
        return ResponseEntity.ok(exam);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> delete(@PathVariable long id) {
        Exam exam = examService.delete(id);
        return ResponseEntity.ok(exam);
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> post(@Valid @RequestBody ExamDTO examDTO) {
        Exam exam = examService.save(examDTO);

        return ResponseEntity.ok(exam);
    }
}

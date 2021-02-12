package tr.com.obss.jss.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.User;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

public class MyExamDetails implements ExamDetails {

    private Exam exam;
    private User owner;

    public MyExamDetails(Exam exam) {
        this.exam = exam;
    }

    public MyExamDetails(User owner) {
        this.owner = owner;
    }

 /*   @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return exam != null ?
                exam.getOwner().stream().map(t ->
                        new SimpleGrantedAuthority(t.getName()))
                        .collect(Collectors.toList()) :
                Collections.emptyList();
    }*/

}

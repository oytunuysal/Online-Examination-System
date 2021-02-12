package tr.com.obss.jss.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import tr.com.obss.jss.model.ExamDetails;

public interface ExamDetailsService {
    ExamDetails loadExamByOwner(String name) throws UsernameNotFoundException;
}

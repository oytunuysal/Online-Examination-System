package tr.com.obss.jss.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import tr.com.obss.jss.model.ExamDetails;
import tr.com.obss.jss.model.ResultDetails;

public interface ResultDetailsService {
    ResultDetails loadResultByStudent(String name) throws UsernameNotFoundException;
}

package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.obss.jss.entity.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    
}

package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}

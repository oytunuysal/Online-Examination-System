package tr.com.obss.jss.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tr.com.obss.jss.entity.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {


    Optional<Answer> findById(long id);

}
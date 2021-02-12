package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tr.com.obss.jss.entity.Exam;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {

    @Query(value = "select * from Exam e where e.id = :id", nativeQuery = true)
    Optional<Exam> getByIdNative(long id);

    List<Exam> findByNameStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String name);
}

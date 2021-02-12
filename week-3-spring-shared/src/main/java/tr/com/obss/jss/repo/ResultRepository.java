package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.Result;
import tr.com.obss.jss.entity.Role;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    @Query(value = "select * from Exam e where e.id = :id", nativeQuery = true)
    Optional<Result> getByIdNative(long id);

    List<Result> findByNameStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String name);
}

package tr.com.obss.jss.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import tr.com.obss.jss.entity.Exam;
import tr.com.obss.jss.entity.Result;
import tr.com.obss.jss.entity.Role;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    @Query(value = "select * from Result r where r.id = :id", nativeQuery = true)
    Optional<Result> getByIdNative(long id);
    Result findTopByOrderByGrade();
    List<Result> findByIdStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String id);
}

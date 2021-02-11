package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.Result;
import tr.com.obss.jss.entity.Role;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {

}

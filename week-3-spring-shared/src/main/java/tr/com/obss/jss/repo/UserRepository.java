package tr.com.obss.jss.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.com.obss.jss.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMail(String mail);

    List<User> findByMailStartingWithAndOperationTypeIsNotNullAndActiveTrueOrderByIdDesc(String mail);

    List<User> findByRoles_NameIn(List<String> roles);

    @Query("select u from User u where u.id = :id")
    Optional<User> getById(long id);

    @Query(value = "select * from User u where u.id = :id", nativeQuery = true)
    Optional<User> getByIdNative(long id);
}

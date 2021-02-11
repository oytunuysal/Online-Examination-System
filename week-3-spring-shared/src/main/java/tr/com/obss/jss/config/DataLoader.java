package tr.com.obss.jss.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import tr.com.obss.jss.entity.Role;
import tr.com.obss.jss.repo.RoleRepository;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        boolean studentRoleExists = roleRepository.existsByName("ROLE_STUDENT");
        if (!studentRoleExists) {
            Role studentRole = new Role();
            studentRole.setName("ROLE_STUDENT");
            roleRepository.save(studentRole);
        }

        boolean instructorRoleExists = roleRepository.existsByName("ROLE_INSTRUCTOR");
        if (!instructorRoleExists) {
            Role instructorRole = new Role();
            instructorRole.setName("ROLE_INSTRUCTOR");
            roleRepository.save(instructorRole);
        }
    }
}

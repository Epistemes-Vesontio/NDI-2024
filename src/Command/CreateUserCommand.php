<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-user',
    description: 'Create an user with the given credentials',
)]
class CreateUserCommand extends Command {

    public function __construct(
        /**
         * The Symfony password hasher.
         * 
         * @var UserPasswordHasherInterface
         */
        private readonly UserPasswordHasherInterface $passwordHasher,

        /**
         * The Doctrine entity manager.
         *
         * @var EntityManager
         */
        private readonly EntityManagerInterface $em
    ) {
        parent::__construct();
    }

    protected function configure(): void {
        $this
            ->addArgument('username', InputArgument::REQUIRED, 'Admin username')
            ->addArgument('password', InputArgument::REQUIRED, 'Admin password')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        // Extract credentials from arguments
        $username = $input->getArgument('username');
        $password = $input->getArgument('password');

        // Create user
        $user = new User();
        $user->setUsername($username);
        $user->setPassword($this->passwordHasher->hashPassword($user, $password));

        // Save it
        $this->em->persist($user);
        $this->em->flush();

        $io->success('User created');

        return Command::SUCCESS;
    }
}

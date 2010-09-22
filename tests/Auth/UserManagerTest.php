<?php
namespace de\RaumZeitLabor\PartDB2\Tests\Auth;

use de\RaumZeitLabor\PartDB2\Auth\UserManager,
	de\RaumZeitLabor\PartDB2\Auth\User,
	de\RaumZeitLabor\PartDB2\Auth\Exceptions\UserAlreadyExistsException,
	de\RaumZeitLabor\PartDB2\PartDB2;

class UserManagerTest extends \PHPUnit_Framework_TestCase {
	
	private $userManager;
	
	public function setUp () {
		$this->userManager = UserManager::getInstance();
	}
	
	public function testUserExists () {
		$this->assertFalse($this->userManager->userExists(new User("foobar")));	
	}
	
	public function testCreateUser () {
		$user = new User;
		$user->setUsername("testuser");
		$user->setPassword("testpassword");
		
		$this->userManager->createUser($user);
		
		$this->setExpectedException("de\RaumZeitLabor\PartDB2\Auth\Exceptions\UserAlreadyExistsException");
		$this->userManager->createUser($user);
		
	}
	
	public function testDeleteUser () {
		
		$user = new User;
		$user->setUsername("foobar");
		
		$this->setExpectedException("de\RaumZeitLabor\PartDB2\Auth\Exceptions\UserDoesNotExistException");
		$this->userManager->deleteUser($user);
		
		$user = new User;
		$user->setUsername("testuser");
		$this->userManager->deleteUser($user);
	}
	
	public function testLogin () {
		$user = new User;
		$user->setUsername("test");
		$user->setPassword("test");
		
		$this->userManager->createUser($user);
		PartDB2::getEM()->flush();
		
		$user2 = new User;
		$user2->setRawUsername("2test");
		$user2->setPassword("test");
		
		/* User shouldn't be able to login, even if we cut numbers and special chars from usernames */
		$this->setExpectedException("de\RaumZeitLabor\PartDB2\Auth\Exceptions\InvalidLoginDataException");
		$this->userManager->authenticate($user2);
		
	}
}

?>
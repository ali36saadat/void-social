import { v4 as uuidv4 } from 'uuid';

// USER CLASS
class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  private password: string;
  bio: string;
  followers: string[];
  followings: string[];
  followRequests: string[];

  constructor(
    id: string = uuidv4(),
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    bio: string = '',
    followers: string[] = [],
    followings: string[] = [],
    followRequests: string[] = []
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.bio = bio;
    this.followers = followers;
    this.followings = followings;
    this.followRequests = followRequests;
  }

  register(): boolean {
    const users = User.getUsersFromStorage();
    if (!users.some((user) => user.username === this.username)) {
      users.push(this);
      User.saveUsersToStorage(users);
      return true;
    }
    return false;
  }

  login(password: string): boolean {
    return this.password === password;
  }

  updateBio(newBio: string): void {
    this.bio = newBio;
    this.updateProfileLocal();
  }

  sendFollowRequest(username: string): void {
    this.followRequests.push(username);
    this.updateProfileLocal();
  }

  acceptFollowRequest(username: string): void {
    const user = User.findProfile(username);
    if (user) {
      this.followRequests = this.followRequests.filter(
        (reqUsername) => reqUsername !== username
      );
      this.followers.push(username);
      user.followings.push(this.username);
      user.updateProfileLocal();
      this.updateProfileLocal();
    }
  }

  rejectFollowRequest(username: string): void {
    this.followRequests = this.followRequests.filter(
      (reqUsername) => reqUsername !== username
    );
    this.updateProfileLocal();
  }

  unfollowFollowing(username: string): void {
    const user = User.findProfile(username);
    if (user) {
      user.followings = user.followings.filter(
        (reqUsername) => reqUsername !== this.username
      );
      this.followers = this.followers.filter(
        (reqUsername) => reqUsername !== username
      );
      user.updateProfileLocal();
      this.updateProfileLocal();
    }
  }

  checkRequest(username: string): boolean {
    return this.followRequests.includes(username);
  }

  checkFollow(username: string): boolean {
    return this.followers.includes(username);
  }

  private updateProfileLocal(): void {
    const users = User.getUsersFromStorage();
    const updatedUsers = users.map((user) => {
      return user.username === this.username ? this : user;
    });
    User.saveUsersToStorage(updatedUsers);
    User.saveCurrentUserToStorage(this);
  }

  static updateProfile(updatedUser: User): void {
    const users = User.getUsersFromStorage();
    const updatedUsers = users.map((user) => {
      return user.username === updatedUser.username ? updatedUser : user;
    });
    User.saveUsersToStorage(updatedUsers);
  }

  static findProfile(username: string): User | null {
    const users = User.getUsersFromStorage();
    const user = users.find((user) => user.username === username);
    return user ? User.mapToUser(user) : null;
  }

  private static getUsersFromStorage(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users).map(User.mapToUser) : [];
  }

  private static saveUsersToStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  private static saveCurrentUserToStorage(currentUser: User): void {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  private static mapToUser(userData: any): User {
    return new User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.password,
      userData.bio,
      userData.followers,
      userData.followings,
      userData.followRequests
    );
  }
}

export default User;

import { User } from './../../domains/user';
import { UserVerification } from './../../domains/user-verification';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Question } from './../../domains/question';
import { Subject } from 'rxjs/Subject';
import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import {
  HttpModule, Http, Response, ResponseOptions,
  XHRBackend, ConnectionBackend, BaseRequestOptions, Connection, RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { UserService } from './user.service';
import { AlertService } from '../alert/alert.service';
import { ResetForgottenPassword } from '../../domains/reset-forgotten-password';

const mockUser = {
  users: [
    {
      id: 'id1',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'test@test.com',
      password: '123456',
      locked: false,
    },
    {
      id: 'id2',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'test@test.com',
      password: '123456',
    },
    {
      id: 'id3',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'test@test.com',
      password: '123456',
    }
  ]
};

const mockResetPasswordRequest: ResetForgottenPassword = {
  username: 'test@test.com',
  newPassword: 'Bob.Jammin.IsAwesome',
  resetGuid: '1234-5112-423131',
};

const mockUserResponse = {
  users: mockUser.users,
  paginationTotalElements: mockUser.users.length
};

const errorResponse = new Response(new ResponseOptions({ status: 400 }));

const mockAuthService = {
  logout() { },
  getHeaders() { },
  login(username: string, password: string) { },
  isLoggedIn() { },
  getToken() { }
};

function compareUsers(actual: User, expected: User): void {
  expect(actual.id).toEqual(expected.id, 'user firstName should match');
  expect(actual.firstName).toEqual(expected.firstName, 'user firstName should match');
  expect(actual.lastName).toEqual(expected.lastName, 'use lastName should match');
  expect(actual.username).toEqual(expected.username, 'user email should match');
}

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        {
          provide: Http, useFactory: (
            backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions,
        UserService,
        { provide: AuthService, useValue: mockAuthService },
        AlertService,
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('createUser() should create and return user', fakeAsync(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.method === RequestMethod.Post && connection.request.url.endsWith('users')) {
          const response = new ResponseOptions({ body: mockUser });
          connection.mockRespond(new Response(response));
        } else {
          connection.mockRespond(errorResponse);
        }
      });

      userService.createUser(mockUser.users[0]).subscribe(user => {
        compareUsers(user, mockUser.users[0]);
      }, error => {
      });
    }
  )));

  it('updateUser() should update and return user', fakeAsync(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.method === RequestMethod.Put) {
          const response = new ResponseOptions({ body: mockUser });
          connection.mockRespond(new Response(response));
        } else {
          connection.mockRespond(errorResponse);
        }
      });

      userService.updateUser(mockUser.users[0]).subscribe(user => {
        compareUsers(user, mockUser.users[0]);
      }, error => {
      });
    }
  )));

  it('unlockUser() should update and return user', fakeAsync(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.method === RequestMethod.Put) {
          const response = new ResponseOptions({ body: mockUser });
          connection.mockRespond(new Response(response));
        } else {
          connection.mockRespond(errorResponse);
        }
      });

      userService.unlockUser(mockUser.users[0]).subscribe(user => {
        compareUsers(user, mockUser.users[0]);
      }, error => {
      });
    })));

  it('updateUserAndPassword() should update user and password and return user', fakeAsync(inject([Http, MockBackend, AuthService,
    AlertService], (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.method === RequestMethod.Put) {
          const response = new ResponseOptions({ body: mockUser });
          connection.mockRespond(new Response(response));
        } else {
          connection.mockRespond(errorResponse);
        }
      });

      const verifiedUser = new UserVerification(mockUser.users[0], 'validPassword1!');
      userService.updateUserAndPassword(verifiedUser).subscribe(user => {
        compareUsers(user, mockUser.users[0]);
      }, error => {
      });
    }
  )));

  it('should get a list of users when getUsers', async(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({ body: mockUser });
        connection.mockRespond(new Response(response));
      });

      userService.getUsers().subscribe(users => {
        expect(users.length).toBe(mockUser.users.length);
      });
    }
  )));

  it('should delete a user when deleteUser is called', async(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({ body: mockUser });
        connection.mockRespond(new Response(response));
      });

      userService.deleteUser(mockUser.users[0].id).subscribe(res => {
        expect(res).toBe(true);
      });
    }
  )));

  it('getActiveUser() should return the current user', fakeAsync(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.method === RequestMethod.Get && connection.request.url.endsWith('activeUser')) {
          const response = new ResponseOptions({ body: mockUser });
          connection.mockRespond(new Response(response));
        } else {
          connection.mockRespond(errorResponse);
        }
      });

      userService.getActiveUser().subscribe(user => {
        compareUsers(user, mockUser.users[0]);
      }, error => {
      });
    }
  )));

  it('searchUsers() should return a list of users', async(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);

      mockBackend.connections.subscribe((connection: MockConnection) => {
        const response = new ResponseOptions({ body: mockUserResponse });
        connection.mockRespond(new Response(response));
      });

      userService.searchUsers(0, 20, 'lastName', '').subscribe(res => {
        expect(res.users.length).toBe(mockUserResponse.users.length);
        expect(res.paginationTotalElements).toBe(mockUserResponse.paginationTotalElements);
      });
    }
  )));

  it('forgotPassword() success should call info', async(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({ body: null })));
      });

      spyOn(alertService, 'info');
      userService.forgotPassword('test');
      expect(alertService.info).toHaveBeenCalled();
    })));

  it('forgotPassword() error should call error', async(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);
      mockBackend.connections.subscribe(connection => {
        connection.mockError(errorResponse);
      });

      spyOn(alertService, 'error');
      userService.forgotPassword('test');
      expect(alertService.error).toHaveBeenCalled();
    }
  )));

  it('resetForgottenPassword() should return Response', async(inject([Http, MockBackend, AuthService, AlertService],
    (http: Http, mockBackend: MockBackend, authService: AuthService, alertService: AlertService) => {
      const userService = new UserService(http, authService, alertService);
      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({ body: null, status: 200 })));
      });

      userService.resetForgottenPassword(mockResetPasswordRequest).subscribe(res => {
        expect(res.ok).toBeTruthy();
      });
    }
  )));
});

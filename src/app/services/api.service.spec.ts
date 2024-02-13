import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data when getUser is called', () => {
    const dummyUserData = { name: 'John Doe', bio: 'Software Developer', location: 'New York', twitter_username: 'johndoe', avatar_url: 'https://example.com/avatar.png' };
    const username = 'johndoe';

    service.getUser(username).subscribe(user => {
      expect(user).toEqual(dummyUserData);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserData);
  });

  // Add more test cases to cover other service functionalities
});

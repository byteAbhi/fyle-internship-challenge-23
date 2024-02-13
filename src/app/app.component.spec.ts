import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [ApiService] // Provide the ApiService dependency
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService); // Inject the ApiService
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUser and fetchUserRepositories methods on searchUser', () => {
    const userData = { name: 'John Doe', bio: 'Software Developer', location: 'New York', twitter_username: 'johndoe', avatar_url: 'https://example.com/avatar.png' };
    spyOn(apiService, 'getUser').and.returnValue(of(userData));
    spyOn(apiService, 'getUserRepositories').and.returnValue(of([]));

    component.searchUsername = 'johndoe';
    component.searchUser();

    expect(apiService.getUser).toHaveBeenCalledWith('johndoe');
    expect(apiService.getUserRepositories).toHaveBeenCalledWith('johndoe', 1, 10);
    expect(component.userData).toEqual(userData);
  });

  // Add more test cases to cover other component functionalities
});

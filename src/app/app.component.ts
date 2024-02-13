import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchUsername: string = '';
  userData: any;
  userRepos: any[] = [];
  currentPage: number = 1;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  loading: boolean = false; // Loading state variable
  searchClicked: boolean = false; // Flag to track if search button is clicked
  showHeader: boolean = false; // Flag to show/hide header
  showPagination: boolean = false; // Flag to show/hide pagination



  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  searchUser() {
    if (this.searchUsername) {

      this.searchClicked = true;
      this.loading = true; // Set loading to true before API call
      this.apiService.getUser(this.searchUsername).subscribe(
        (userData: any) => {
          console.log(userData);
          this.userData = userData;
          this.fetchUserRepositories(userData.login);
        },
        (error) => {
          console.error('Error fetching user:', error);
          this.loading = false; // Set loading to false after API call completes
          this.showHeader = true; // Show header after user data is fetched
        }
      );
    } else {
      console.log('Please enter a username to search.');
    }
  }

  fetchUserRepositories(username: string) {
    this.apiService.getUserRepositories(username, this.currentPage, this.pageSize).subscribe(
      (repos: any[]) => {
        console.log(repos);
        this.userRepos = repos;
        this.loading = false; // Hide loading indicator after repositories are fetched
        this.showPagination = true; // Show pagination after repositories are fetched
      },
      (error) => {
        console.error('Error fetching repositories:', error);
        this.loading = false; // Set loading to false after API call completes
      }
    );
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchUserRepositories(this.userData.login);
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.currentPage = 1; // Reset to first page when changing page size
    this.fetchUserRepositories(this.userData.login);
  }

  getTopicColor(topic: string): string {
    // You can define your color logic here based on the topic
    // For example, you can use a switch statement to assign different colors to different topics
    switch (topic.toLowerCase()) {
        // Return green for React topic
      default:
        return '#007bff'; // Return gray for other topics
    }
  }

}

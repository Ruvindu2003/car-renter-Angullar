import { TestBed } from '@angular/core/testing';
import { ImageCompPathService } from './image-comp-path.service';


describe('ImageCompPathService', () => {
  let service: ImageCompPathService;  

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCompPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

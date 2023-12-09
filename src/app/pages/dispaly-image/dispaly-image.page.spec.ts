import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DispalyImagePage } from './dispaly-image.page';

describe('DispalyImagePage', () => {
  let component: DispalyImagePage;
  let fixture: ComponentFixture<DispalyImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DispalyImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

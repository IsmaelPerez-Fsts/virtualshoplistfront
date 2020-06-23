import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListDetailComponent } from './shop-list-detail.component';

describe('ShopListDetailComponent', () => {
  let component: ShopListDetailComponent;
  let fixture: ComponentFixture<ShopListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

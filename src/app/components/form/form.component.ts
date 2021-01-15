import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PointService} from '../../service/point/point.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  @Output() radius: EventEmitter<object> = new EventEmitter<object>();
  constructor(private formBuilder: FormBuilder, private httpPoint: PointService) {
    this.form = formBuilder.group({
      xField: [null, [Validators.required, Validators.pattern('^(0$|-?[1-4](\\.\\d*[1-9]$)?|-?0\\.\\d*[1-9]|-?5)$')]],
      yField: [-3],
      rField: [1, [Validators.required, Validators.pattern('^([1-4](\\.\\d*[1-9]$)?|5)$')]]
    });
  }

  ngOnInit(): void {
    this.form.get('rField')?.valueChanges.subscribe(() => {
      this.radius.emit({r: this.form.get('rField')?.value, valid: this.form.get('rField')?.valid});
    });
  }

  submit(): void {
    console.log('SEND');
    const xValue = this.form.get('xField')?.value;
    const yValue = this.form.get('yField')?.value;
    const rValue = this.form.get('rField')?.value;
    this.httpPoint.doPost({x: xValue, y: yValue, r: rValue});
  }

}
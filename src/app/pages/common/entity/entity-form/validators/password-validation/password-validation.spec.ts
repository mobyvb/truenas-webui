import { TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormBuilder, FormGroup, FormsModule,
} from '@angular/forms';
import { doesNotEqual } from 'app/pages/common/entity/entity-form/validators/password-validation/password-validation';
import { matchOtherValidator } from './password-validation';

describe('PasswordValidation', () => {
  describe('matchOtherValidator', () => {
    let thisControl: AbstractControl;
    let otherControl: AbstractControl;
    let form: FormGroup;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, FormBuilder],
        declarations: [matchOtherValidator],
      });

      const formBuilder = new FormBuilder();
      form = formBuilder.group({
        this: ['', [matchOtherValidator('other')]],
        other: ['', []],
      });

      thisControl = form.get('this');
      otherControl = form.get('other');
    });

    it('should have parent', () => {
      expect(thisControl.parent).toBeTruthy();
    });

    it('should throw error when no otherControl is given', () => {
      form.removeControl('other');

      expect(() => {
        thisControl.setValue('test');
      }).toThrowError('matchOtherValidator(): other control is not found in parent group');
    });

    it('should not have matchOther error', () => {
      otherControl.setValue('changed');
      thisControl.setValue('changed');
      expect(thisControl.hasError('matchOther')).toBeFalsy();
      expect(otherControl.value).toBe(thisControl.value);
    });

    it('should have matchOther error', () => {
      thisControl.setValue('invoke error');
      expect(thisControl.hasError('matchOther')).toBeTruthy();
    });
  });

  describe('doesNotEqual', () => {
    let thisControl: AbstractControl;
    let otherControl: AbstractControl;
    let form: FormGroup;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, FormBuilder],
      });

      const formBuilder = new FormBuilder();
      form = formBuilder.group({
        this: ['', [doesNotEqual('other')]],
        other: ['', []],
      });

      thisControl = form.get('this');
      otherControl = form.get('other');
    });

    it('should have parent', () => {
      expect(thisControl.parent).toBeTruthy();
    });

    it('should throw error if otherControl is missing', () => {
      form.removeControl('other');

      expect(() => {
        thisControl.setValue('test');
      }).toThrowError('doesNotEqual(): other control is not found in parent group');
    });

    it('should have matchesOther error', () => {
      otherControl.setValue('invoke error');
      thisControl.setValue('invoke error');
      expect(otherControl.value).toBe(thisControl.value);
      expect(thisControl.hasError('matchesOther')).toBeTruthy();
      expect(form.valid).toBeFalsy();
    });

    it('should not have matchesOther error', () => {
      thisControl.setValue(null);
      otherControl.setValue('non-null');
      expect(thisControl.hasError('matchesOther')).toBeFalsy();
      expect(form.valid).toBeTruthy();
    });
  });
});

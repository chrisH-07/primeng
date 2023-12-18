import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPicker } from './colorpicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: ` <p-colorPicker [(ngModel)]="color1"></p-colorPicker> `
})
class TestColorPickerComponent {
    color1: string = '#1976D2';
}

describe('ColorPicker', () => {
    let colorpicker: ColorPicker;
    let testComponent: TestColorPickerComponent;
    let fixture: ComponentFixture<TestColorPickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, FormsModule],
            declarations: [ColorPicker, TestColorPickerComponent]
        });

        fixture = TestBed.createComponent(TestColorPickerComponent);
        colorpicker = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;
    });

    it('should created by default', () => {
        fixture.detectChanges();

        const colorPickerEl = fixture.debugElement.query(By.css('.p-colorpicker'));
        expect(colorPickerEl.nativeElement).toBeTruthy();
    });

    it('should inline', () => {
        colorpicker.inline = true;
        fixture.detectChanges();

        const overlayEl = fixture.debugElement.query(By.css('.p-colorpicker-overlay'));
        expect(overlayEl).toBeFalsy();
    });

    it('should select color', () => {
        colorpicker.inline = true;
        fixture.detectChanges();

        const pickColorSpy = spyOn(colorpicker, 'pickColor').and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.triggerEventHandler('mousedown', { pageX: 100, pageY: 120 });
        fixture.detectChanges();

        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickColorSpy).toHaveBeenCalled();
    });

    it('should select hue', () => {
        colorpicker.inline = true;
        fixture.detectChanges();

        const pickHueSpy = spyOn(colorpicker, 'pickHue').and.callThrough();
        const hueSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-hue'));
        hueSelectorEl.triggerEventHandler('mousedown', { pageX: 20, pageY: 25 });
        fixture.detectChanges();

        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickHueSpy).toHaveBeenCalled();
    });

    it('should call togglePanel when click on input', () => {
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        const toggleSpy = spyOn(colorpicker, 'togglePanel').and.callThrough();
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const selectorEl = fixture.debugElement.query(By.css('.p-colorpicker-panel'));
        expect(toggleSpy).toHaveBeenCalled();
        expect(selectorEl).toBeTruthy();
    });

    it('should select color (overlay)', () => {
        colorpicker.appendTo = 'body';
        fixture.detectChanges();

        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        const pickColorSpy = spyOn(colorpicker, 'pickColor').and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.nativeElement.click();
        colorSelectorEl.triggerEventHandler('mousedown', { pageX: 100, pageY: 120 });
        const mouseMoveEvent: any = document.createEvent('CustomEvent');
        mouseMoveEvent.pageX = 101;
        mouseMoveEvent.pageY = 121;
        mouseMoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mouseMoveEvent);
        document.dispatchEvent(mouseMoveEvent as MouseEvent);
        fixture.detectChanges();

        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();

        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickColorSpy).toHaveBeenCalled();
    });

    it('should close when inputclick', () => {
        fixture.detectChanges();

        const hideSpy = spyOn(colorpicker, 'hide').and.callThrough();
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();

        let selectorEl = fixture.debugElement.query(By.css('.p-colorpicker-panel'));
        expect(selectorEl).toBeTruthy();
        inputEl.nativeElement.click();
        fixture.detectChanges();

        selectorEl = fixture.debugElement.query(By.css('.p-colorpicker-panel'));
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should open space keydown and close esc keydown', () => {
        fixture.detectChanges();

        const hideSpy = spyOn(colorpicker, 'hide').and.callThrough();
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        const openEvent: any = document.createEvent('CustomEvent');
        openEvent.which = 32;
        openEvent.initEvent('keydown', true, true);
        inputEl.nativeElement.dispatchEvent(openEvent);
        fixture.detectChanges();

        let selectorEl = fixture.debugElement.query(By.css('.p-colorpicker-panel'));
        expect(selectorEl).toBeTruthy();
        const escapeEvent: any = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        inputEl.nativeElement.dispatchEvent(escapeEvent);
        fixture.detectChanges();

        selectorEl = fixture.debugElement.query(By.css('.p-colorpicker-panel'));
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should initialize with default color', () => {
        fixture.detectChanges();
        expect(testComponent.color1).toEqual('#1976D2');
    });

    it('should update model on color selection', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
        const pickColorSpy = spyOn(colorpicker, 'pickColor').and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.triggerEventHandler('mousedown', { pageX: 100, pageY: 120 });
        fixture.detectChanges();
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();
        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickColorSpy).toHaveBeenCalled();
    });
    
    it('should update model on hue selection', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
        const pickHueSpy = spyOn(colorpicker, 'pickHue').and.callThrough();
        const hueSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-hue'));
        hueSelectorEl.triggerEventHandler('mousedown', { pageX: 20, pageY: 25 });
        fixture.detectChanges();
        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickHueSpy).toHaveBeenCalled();
    });
    
    it('should update model on color panel selection', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
        const pickColorSpy = spyOn(colorpicker, 'pickColor').and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.triggerEventHandler('mousedown', { pageX: 100, pageY: 120 });
        fixture.detectChanges();
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();
        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickColorSpy).toHaveBeenCalled();
    });
    
    it('should update the model on color selection (inline)', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
    
        const pickColorSpy = spyOn(colorpicker, 'pickColor').and.callThrough();
        const colorSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-color-selector'));
        colorSelectorEl.triggerEventHandler('mousedown', { pageX: 100, pageY: 120 });
        fixture.detectChanges();
    
        document.dispatchEvent(new Event('mouseup'));
        fixture.detectChanges();
    
        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickColorSpy).toHaveBeenCalled();
    });

    it('should update the model on hue selection (inline)', () => {
        colorpicker.inline = true;
        fixture.detectChanges();
    
        const pickHueSpy = spyOn(colorpicker, 'pickHue').and.callThrough();
        const hueSelectorEl = fixture.debugElement.query(By.css('.p-colorpicker-hue'));
        hueSelectorEl.triggerEventHandler('mousedown', { pageX: 20, pageY: 25 });
        fixture.detectChanges();
    
        expect(testComponent.color1).not.toEqual('#1976D2');
        expect(pickHueSpy).toHaveBeenCalled();
    });

    it('should toggle panel on input click', () => {
        fixture.detectChanges();
    
        const inputEl = fixture.debugElement.query(By.css('.p-inputtext'));
        const toggleSpy = spyOn(colorpicker, 'togglePanel').and.callThrough();
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
    
        expect(toggleSpy).toHaveBeenCalled();
    });

    it('should convert RGB to HSB', () => {
        const rgbValue = { r: 255, g: 36, b: 153 };
        const hsbResult = colorpicker.RGBtoHSB(rgbValue);
    
        expect(hsbResult.h).toBeCloseTo(327.9, 1);
        expect(hsbResult.s).toBeCloseTo(85.9, 1);
        expect(hsbResult.b).toEqual(100);
    });
    
    it('should convert HSB to RGB', () => {
        const hsbValue = { h: 100, s: 73, b: 28 };
        const rgbResult = colorpicker.HSBtoRGB(hsbValue);
    
        expect(rgbResult.r).toEqual(37);
        expect(rgbResult.g).toEqual(71);
        expect(rgbResult.b).toEqual(19);
    });

    it('should convert HEX to RGB', () => {
        const hexValue = '#FF00D2';
        const rgbResult = colorpicker.HEXtoRGB(hexValue);
    
        expect(rgbResult.r).toEqual(255);
        expect(rgbResult.g).toEqual(0);
        expect(rgbResult.b).toEqual(210);
    });
    
    it('should convert HEX to HSB', () => {
        const hexValue = '#CFD712';
        const hsbResult = colorpicker.HEXtoHSB(hexValue);
    
        expect(hsbResult.h).toBeCloseTo(62.4, 1);
        expect(hsbResult.s).toBeCloseTo(91.6, 1);
        expect(hsbResult.b).toBeCloseTo(84.3, 1);
    });

    it('should convert HSB to HEX', () => {
        const hsbValue = { h: 200, s: 60, b: 80 };
        const hexResult = colorpicker.HSBtoHEX(hsbValue);
    
        expect(hexResult).toEqual('52a3cc');
    });

    it('should convert RGB to HEX', () => {
        const rgbValue = { r: 125, g: 255, b: 0 };
        const hexResult = colorpicker.RGBtoHEX(rgbValue);

        expect(hexResult).toEqual('7dff00');
    });
});

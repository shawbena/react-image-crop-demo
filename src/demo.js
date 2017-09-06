import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // eslint-disable-line
import ReactCrop from '../lib/ReactCrop';

/**
 * Load the image in the crop editor.
 */
const cropEditor = document.querySelector('#crop-editor');

function loadEditView(dataUrl) {
  class Parent extends Component {
    constructor() {
      super();
      this.state = {
        crop: {
          x: 0,
          y: 0,
        },
        maxHeight: 80,
      };
      this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
      this.setState({
        crop: {
          x: 20,
          y: 5,
          aspect: 1,
          width: 30,
          height: 50,
        },
      });
    }

    onImageLoaded = (crop) => {
      console.log('Image was loaded. Crop:', crop);
      // this.setState({
      //  crop: {
      //    aspect: 16/9,
      //    width: 30,
      //  }
      // });
    }

    onCropComplete = (crop, pixelCrop) => {
      console.log('Crop move complete:', crop, pixelCrop);
      this.setState({ hello: Date.now(), crop });
    }

    // onCropChange: function(crop) {
    //  console.log('Crop change');
    // },
    getCroppedImage = () => {
      let crop = this.state.crop;
      let canvas = this.canvas;
      canvas.height = 124;
      canvas.width = 104;
      let ctx = canvas.getContext('2d');
      let srcImage = new Image();
      srcImage.src = dataUrl;
      ctx.drawImage(srcImage, 33, 71, 104, 124, 0, 0, 104, 124);
      let croppedImg = canvas.toDataURL();
      this.setState({ croppedImg });
    }
    render() {
      let croppedImg;
      if(this.state.croppedImg){
        croppedImg = <img src={this.state.croppedImg}/>
      }
      return (
        <div>
          <ReactCrop
            {...this.state}
            src={dataUrl}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            // onAspectRatioChange={() => console.log('onAspectRatioChange')}
            // onChange={this.onCropChange}
          />
          <button onClick={this.onButtonClick}>Programatically set crop</button>
          <button onClick={() => { this.setState({ foo: Date.now() }); }}>Change foo state</button>
          <button onClick={this.getCroppedImage}>裁剪</button>
          <div>
            <canvas ref={(canvas) => this.canvas = canvas}></canvas>
          </div>
          <div>
            {croppedImg}
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(<Parent />, cropEditor);
}

/**
 * Select an image file.
 */
const imageType = /^image\//;
const fileInput = document.querySelector('#file-picker');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files.item(0);

  if (!file || !imageType.test(file.type)) {
    return;
  }

  const reader = new FileReader();

  reader.onload = (e2) => {
    loadEditView(e2.target.result);
  };

  reader.readAsDataURL(file);
});

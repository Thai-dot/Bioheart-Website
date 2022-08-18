import React from "react";
import pngImg from '../../../../assets/images/png/index';
import './styles.scss';

class MobileLogo extends React.Component {
  render() {
    return (
      <div className="mobileLogo">
      <img src={pngImg.bioheart} alt="bioheart" />
    </div>
    );
  }
}

export default MobileLogo;
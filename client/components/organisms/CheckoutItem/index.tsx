import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

export default function CheckoutItem() {
  const [dataItem, setDataItem] = useState({
    _id: '',
    name: '',
    thumbnail: '',
    category: {
      name: '',
    },
  });

  useEffect(() => {
    const dataItemLocal = localStorage.getItem(btoa('data-item'));
    const key = 'result@_d4tavoucher';
    const encrypted = CryptoJS.AES.decrypt(dataItemLocal!, key);
    const decrypted = encrypted.toString(CryptoJS.enc.Utf8);
    const dataItemParse = JSON.parse(decrypted);

    setDataItem(dataItemParse);
  }, []);

  const API_ING = process.env.NEXT_PUBLIC_IMG;
  return (
    <div className="game-checkout d-flex flex-row align-items-center pt-md-50 pb-md-50 pt-30 pb-30">
      <div className="pe-4">
        <div className="cropped">
          <img src={`${API_ING}/${dataItem.thumbnail}`} className="img-fluid" alt="" />
        </div>
      </div>
      <div>
        <p className="fw-bold text-xl color-palette-1 mb-10">
          {dataItem.name}

        </p>
        <p className="color-palette-2 m-0">
          Category:
          {' '}
          {dataItem.category.name}
        </p>
      </div>
    </div>
  );
}

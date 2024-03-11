'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker ({label, name}) {

    const ImageInput = useRef();
    const [pickedImage, setPickedImage] = useState();

    function imagePickClick() {
        ImageInput.current.click();
    }

    function handlePickedImage (event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <>
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet!!</p>}
                    {pickedImage && <Image src = {pickedImage} alt = "Image picked by user" fill/>}

                </div>
                <input className={classes.input} type='file' id={name} accept='image/png, image/jpeg' name={name} ref={ImageInput} onChange={handlePickedImage} required/>
                <button className={classes.button} type='button' onClick={imagePickClick}>Pick an image</button>
            </div>
        </div>
        </>
    )
}
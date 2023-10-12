"use client"
import { MouseEvent, ChangeEvent, FC } from 'react';
import { twMerge } from 'tailwind-merge';

export type OptionsTypes = {
  value: string | number;
  label: string;
}


type TemplateRadiosTypes = {
  value: any;
  name: string;
  onChange: (arg: ChangeEvent<HTMLInputElement> | any) => void;
  options: OptionsTypes[];
  template: () => JSX.Element;
  className?: string;
}


const TemplateRadios: FC<TemplateRadiosTypes> = ({ name, value, onChange, className, options = [], template }) => {

  const Template = template;


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    onChange((event.target as HTMLInputElement).value);
  };


  const handleInputClick = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.currentTarget;
    let inputElement: HTMLInputElement | null = target.querySelector("input");
    inputElement?.click();
  }


  return (
    <div
      aria-labelledby="radios with templates"
      onChange={(event) => handleChange(event)}
      className={twMerge("", className || "")}
    >
      {
        options.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer w-full h-full" onClick={(event) => handleInputClick(event)}>
              {template ? <Template isLast={index === options.length-1} isChecked={value === item.value} data={item} /> : item.label}
              <input className="hidden" type="radio" value={item.value} name={name} />
            </div>
          )
        })
      }
    </div>
  );
}

export default TemplateRadios;

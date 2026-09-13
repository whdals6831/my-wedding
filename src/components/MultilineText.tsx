import { Fragment } from 'react';

interface MultilineTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'div' | 'span';
}

/** \n 을 <br />로 바꿔 렌더링 */
export function MultilineText({ text, className, as: Tag = 'p' }: MultilineTextProps) {
  return (
    <Tag className={className}>
      {text.split('\n').map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </Tag>
  );
}

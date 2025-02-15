import Link from 'next/link';
import Image, { ImageProps } from 'next/image'

export const staticMDXComponents = {
  a(props) {
    return <a {...props} />
  },
  Link(props) {
    return <a href={props.to} children={props.children} />
  },
  img(props) {
    return <img
             sizes="100vw"
             style={{ width: '100%', height: 'auto' }}
             {...props}
           />
  }
};

export function useMDXComponents(components) {
  return {
    img: (props) => (
      <img
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...props}
      />
    ),
    ...components,
  }
}

import { css } from "@emotion/react";
const flexGrow0 = css`
  flex-grow: 0 !important;
`;
const gridTemplate221 = css`
  display: grid;
  grid-gap: 1rem;
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 619px) and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 619px) {
    grid-template-columns: 1fr;
  }
`;

const gridTemplate421 = css`
  display: grid;
  grid-gap: 1rem;
  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 619px) and (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 619px) {
    grid-template-columns: 1fr;
  }
`;

const widthAuto = css`
  width: auto;
`;

const dFlex = css`
  display: flex !important;
`;

const justifyContentCenter = css`
  justify-content: center !important;
`;

const flexWrap = css`
  flex-wrap: wrap !important;
`;

const smAlignLeft = css`
  text-align: left;
  --justify-content: flex-start;
  justify-content: flex-start;
`;

const lAlignCenter = css`
  --justify-content: center;
  justify-content: center;
  text-align: center;
`;

const fnTextAlignCss = ({
  textAlignDesktop,
  textAlignTablet,
  textAlignMobile,
}) => ({
  mobile: textAlignMobile == "center" ? lAlignCenter : smAlignLeft,
  tablet: textAlignTablet == "center" ? lAlignCenter : smAlignLeft,
  desktop: textAlignDesktop == "center" ? lAlignCenter : smAlignLeft,
});

const gridTemplate321 = css`
display: grid;
grid-gap: 1rem;
@media screen and (min-width: 992px){
    grid-template-columns: repeat(3,1fr);
} 
@media screen and (min-width: 619px) and (max-width: 991px){
    grid-template-columns: repeat(2,1fr);
}
@media screen and (max-width: 619px){
    grid-template-columns: 1fr; 
} `


const appLoadercontainerCss = css`
                            max-width: 1184px;
                            @media screen and (min-width: 992px){
                                margin: 0 auto
                            }
                            @media screen and (max-width: 991px){
                                margin-left: 1.5rem;
                                margin-right: 1.5rem;
                            }                             
                        `
const appLoaderMaxWidthNarrowCss = css`
                        max-width: 784px;
                        @media screen and (min-width: 992px){
                            margin: 0 auto
                        }
                        @media screen and (max-width: 991px){
                            margin-left: 1.5rem;
                            margin-right: 1.5rem;
                        }                             
                    `
const grid = css`
                        display: grid;
                        grid-gap: 1rem;
                        @media screen and (min-width: 992px){
                            grid-template-columns: repeat(4,1fr);
                        } 
                        @media screen and (min-width: 619px) and (max-width: 991px){
                            grid-template-columns: repeat(2,1fr);
                        }
                        @media screen and (max-width: 619px){
                            grid-template-columns: 1fr; 
                        }  
                         `
export {
  appLoadercontainerCss,
  appLoaderMaxWidthNarrowCss,
  flexGrow0,
  widthAuto,
  grid,
  gridTemplate221,
  gridTemplate321,
  gridTemplate421,
  dFlex,
  justifyContentCenter,
  flexWrap,
  smAlignLeft,
  lAlignCenter,
  fnTextAlignCss
};

export const overideProps = {
    carouselBlock: {
        carouselBanners: {
            bannerType: 'fullwidthcardbanner',
            carouselOverlayBanner: {
                container: {
                    desktop: {
                        // layout: 'full',
                        pad: 0,
                        padPosition: ''
                    }
                },
                slickCarousel: {
                    carousel: {
                        desktop: {
                            // autoplay: false,
                            // dots: false
                        }
                    }
                },
                // overlayHeaderStyles: {},
                banner: {
                    header: {
                        container: {
                            mobile: {
                                pad: 'm',
                                padPosition: 'top'
                            },
                            tablet: {
                                pad: 'm',
                                padPosition: 'top'
                            }
                        },
                        alignContent: {
                            mobile: {
                                alignItems: 'flexStart'
                            },
                            tablet: {
                                alignItems: 'flexStart'
                            }
                        },
                        title: {
                            desktop: {
                                // color: 'primary-inverse',
                                appearance: 'heading-m',
                            },
                            mobile: {
                                // color: 'primary-inverse',
                                appearance: 'heading-xs',
                            },
                            tablet: {
                                // color: 'primary-inverse',
                                appearance: 'heading-xs',
                            }
                        },
                        description: {
                            desktop: {
                                appearance: 'body-m'
                            },
                            mobile: {
                                appearance: 'body-xs'
                            },
                            tablet: {
                                appearance: 'body-xs'
                            }
                        },
                        buttonGroup: {
                            button: {
                                primary: {
                                    desktop: {
                                        size: 'small'
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }

    }

}
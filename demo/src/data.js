const blocks = JSON.parse(`
  [ 
    { 
      "baseAttrs":{ 
          "source":"# Introduction\\n\\nreact-brandywine-editor is a simple block based editor based on dragging and dropping __plugins__ to  create __blocks__.  The content you see on this page is serialized to a JSON data structure that can be saved to a database and used again to initialize the editor. \\n\\nThe library comes shipped with a set of default plugins to help you create content right away. Building your own plugins is easy as well - check out the [docs] to find out how.\\n\\nKeep reading for an introduction on the default plugins and how they can be used to create great looking pages. Or, check out an example of a  [live blog](https://alecng.ca/blog) using react-brandywine-editor to create and render content.\\n"
      },
      "name":"markdown",
      "variation":"markdown_default",
      "variationAttrs":{ 
          "markdown_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "source":"## Images\\n\\nSingle images can be shown with or without a set of captions, and can be rendered in several sizes."
      },
      "name":"markdown",
      "variation":"markdown_default",
      "variationAttrs":{ 
          "markdown_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "primaryText":"This is a large image. Note that large sizing will line up with markdown text.",
          "secondaryText":"This image was taken in the Pacific Rim Park!",
          "size":"large",
          "urlSource":"https://i.imgur.com/pqYHMmP.jpg"
      },
      "name":"image",
      "variation":"image_default",
      "variationAttrs":{ 
          "image_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "primaryText":"Here's a medium sized picture.",
          "size":"medium",
          "urlSource":"https://i.imgur.com/s286kcM.jpg"
      },
      "name":"image",
      "variation":"image_default",
      "variationAttrs":{ 
          "image_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "size":"small",
          "urlSource":"https://i.imgur.com/LNQMzns.jpg"
      },
      "name":"image",
      "variation":"image_default",
      "variationAttrs":{ 
          "image_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "source":"## Cover photos \\nGreat for panoramas and landscape images. A text overlay can also be included to serve as a caption. Multiple cover photos look great when used with a negative spacer so they don't have any whitespace between them."
      },
      "name":"markdown",
      "variation":"markdown_default",
      "variationAttrs":{ 
          "markdown_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "urlSource":"https://i.imgur.com/wgM6Ym7.jpg"
      },
      "name":"coverPhoto",
      "variation":"coverPhoto_text_overlay",
      "variationAttrs":{ 
          "coverPhoto_text_overlay":{ 
            "bottom":"34",
            "left":"22",
            "right":"26",
            "text":"On the way to Tszil Mountain in Joffre Lakes Provincial Park, British Columbia"
          }
      }
    },
    { 
      "baseAttrs":{ 

      },
      "name":"spacer",
      "variation":"inverse",
      "variationAttrs":{ 
          "inverse":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "urlSource":"https://i.imgur.com/S1ziTDS.jpg"
      },
      "name":"coverPhoto",
      "variation":"coverPhoto_default",
      "variationAttrs":{ 
          "coverPhoto_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 

      },
      "name":"spacer",
      "variation":"inverse",
      "variationAttrs":{ 
          "inverse":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "urlSource":"https://i.imgur.com/iEUEtmc.jpg"
      },
      "name":"coverPhoto",
      "variation":"coverPhoto_default",
      "variationAttrs":{ 
          "coverPhoto_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "source":"# Carousels\\n\\nPlugin using [react-item-caorusel](https://bitriddler.github.io/react-items-carousel/). Options to customize how many images are shown at once, the height to standardize all images to, as well as the plugin size and an optional caption. Swipe actions on mobile are supported."
      },
      "name":"markdown",
      "variation":"markdown_default",
      "variationAttrs":{ 
          "markdown_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "caption":"A collection of images from Sagarmatha National Park, Nepal",
          "height":"311",
          "numCards":2,
          "size":"large",
          "urlSources":"https://i.imgur.com/HCDMQoO.jpg\\nhttps://i.imgur.com/Hk37efN.jpg\\nhttps://i.imgur.com/HCDMQoO.jpg\\nhttps://i.imgur.com/Hk37efN.jpg"
      },
      "name":"carousel",
      "variation":"carousel_default",
      "variationAttrs":{ 
          "carousel_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "caption":"A medium sized carousel showing just one image at a time",
          "height":"322",
          "numCards":1,
          "size":"medium",
          "urlSources":"https://i.imgur.com/kIgEJR4.jpg\\nhttps://i.imgur.com/eymqvOZ.jpg\\nhttps://i.imgur.com/ooJLrNb.jpg"
      },
      "name":"carousel",
      "variation":"carousel_default",
      "variationAttrs":{ 
          "carousel_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "source":"# Videos\\nVideos can be rendered from a file source or from an embedded link.\\n\\nDirect video files can be autoplayed and looped for a gif effect."
      },
      "name":"markdown",
      "variation":"markdown_default",
      "variationAttrs":{ 
          "markdown_default":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "size":"large",
          "urlSource":"https://i.imgur.com/g2588gS.mp4"
      },
      "name":"html_video",
      "variation":"video_autoplay",
      "variationAttrs":{ 
          "video_autoplay":{ 

          }
      }
    },
    { 
      "baseAttrs":{ 
          "link":"https://www.youtube.com/embed/phOKCo_3bVM",
          "size":"large"
      },
      "name":"embedded_video",
      "variation":"embedded_video_default",
      "variationAttrs":{ 
          "embedded_video_default":{ 

          }
      }
    }
  ]
`);

const header = JSON.parse(`
  { 
    "displayDate1":"2020-01-20",
    "displayDate2":"",
    "subTitle":"Created with react-brandywine-editor",
    "title":"Your first post"
  }
`);

export default {
  blocks: blocks,
  header: header
};

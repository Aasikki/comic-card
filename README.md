
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Aasikki&repository=comic-card&category=plugin)
# Comic Card For Home Assistant

A Home Assistant card for displaying comics from image entities.
Includes a gui card editor, but you can use yaml if you prefer.

<img width="800" alt="kuva" src="https://github.com/user-attachments/assets/f7f55aab-6c41-4386-962f-13bf8824a13e" />

# Card  Options

 - ### Image entity:

	Here you choose the image entity of the comic that you want to display.

## Scaling

 - ### Limit height:

	Limits the comic to the specified height. The comic will become horizontally scrollable if the full comic can't fit inside the card. This is the default option, recommended for when your dashboard will be viewed on both bigger and smaller screens (e.g. on desktop and mobile).

	I recommend making the card big enough (I use full width) so that the whole comic fits in, as this way you'll see the full comic on bigger screens but have scrolling on smaller screens.

	Use the "Height" -option to set your preferred height (250px by default).

 - ### Fit:

	Constrains the comic to the width of the card, not recommended for mobile, as the comic will be too small to read.

 - ### No scale:

	Displays the comic in its original size. Not recommended, the original size might be huge and fill your dash.
	
 - ### Height:

	Sets the height of the comic when using the "Limit height" option. Will be ignored if "Limit height" is not selected.
    Default height is 250px.


## Alignment

 - ### Left:
	
	Aligns the comic to the left side of the card, leaving any unused space on the right side blank.
 - ### Left:
	
	Centers the comic to the middle of the card, dividing any unused space evenly to the left and right sides.

# YAML Config
### Syntax:
| Name | Type | Requirement | Description | Default |
| ---- | ---- | ----------- | ----------- | ------- |
| `type` | string  | **Required** | `custom:comic-card` | |
| `entity` | string  | **Required** | Image entity to be displayed in the card | |
| ``scaling → mode`` | string  | Optional | Sets the scaling mode of the comic to `limit_height`, `fit` or `noscale` | `limit_height` |
| ``scaling → height`` | string  | Optional | Sets the height (in px) of the comic when using the "limit_height" scaling mode. | `250` |
| `alignment` | string | Optional | Sets the alignment of the comic to eather `left` or `center` | `left` |

### Full example:
    type: custom:comic-card
    entity: image.daily_fingerpori
    scaling:
      mode: limit_height
      height: 250
    alignment: left

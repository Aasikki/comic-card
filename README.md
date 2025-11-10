[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Aasikki&repository=comic-card&category=plugin)
# Comic Card For Home Assistant

A Home Assistant card for displaying comics from image entities.
Includes a gui card editor, but you can use yaml if you prefer.

<img width="800" alt="kuva" src="https://github.com/user-attachments/assets/f7f55aab-6c41-4386-962f-13bf8824a13e" />

# YAML Syntax
| Name | Type | Requirement | Description | Default |
| ---- | ---- | ----------- | ----------- | ------- |
| `type` | string  | **Required** | `custom:comic-card` | |
| `entity` | string  | **Required** | Image entity to be displayed in the card | |
| ``scaling → mode`` | string  | Optional | Sets the scaling mode of the comic to `limit_height`, `fit` or `noscale` | `limit_height` |
| ``scaling → height`` | string  | Optional | Sets the height (in px) of the comic when using the "limit_height" scaling mode. | `250` |
| `alignment` | string | Optional | Sets the alignment of the comic to eather `left` or `center` | left |

### Full example
    type: custom:comic-card
    entity: image.daily_fingerpori
    scaling:
      mode: limit_height
      height: 250
    alignment: left

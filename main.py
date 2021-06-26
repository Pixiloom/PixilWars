def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . 1 1 . . . 
                    . . . 1 1 . . . 
                    . . . 1 1 . . . 
                    . . . 1 1 . . .
        """),
        ship,
        0,
        -140)
    projectile.start_effect(effects.cool_radial, 100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    scene.camera_shake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.start_effect(effects.fire, 200)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

projectile: Sprite = None
ship: Sprite = None
asteroids = [img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f f f f . . . . . 
            . . . f f f f f f f f . . . . . 
            . . . f 1 1 f f 1 1 f . . . . . 
            . . . f f f f f f f f . . . . . 
            . . . f f f f f f f f . . . . . 
            . . . f f f f f f f f . . . . . 
            . . . f 1 1 1 1 1 1 f . . . . . 
            . . . f f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 1 1 1 1 1 1 1 1 1 . . . . . 
            . . 1 1 1 1 1 1 1 1 1 . . . . . 
            . . 1 1 f 1 1 1 f 1 1 . . . . . 
            . . 1 1 1 1 1 1 1 1 1 . . . . . 
            . . 1 1 1 1 1 1 1 1 1 . . . . . 
            . . 1 f 1 1 1 1 1 f 1 . . . . . 
            . . 1 f f f f f f f 1 . . . . . 
            . . 1 1 1 1 1 1 1 1 1 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """)]
ship = sprites.create(img("""
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f f f f f f f f . . . . . 
            . f f f f f f f f f f . . . . . 
            . f f 1 f f f f 1 f f . . . . . 
            . f f f f f f f f f f . . . . . 
            . f f f f f f f f f f . . . . . 
            . f f f f f f f f f f . . . . . 
            . f 1 f f f f f f 1 f . . . . . 
            . f f 1 1 1 1 1 1 f f . . . . . 
            . f f f f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    """),
    SpriteKind.player)
ship.set_stay_in_screen(True)
ship.bottom = 120
controller.move_sprite(ship, 100, 100)
info.set_life(3)
effects.star_field.start_screen_effect()
music.play_melody("A F E F D G E F ", 90)

def on_update_interval():
    global projectile
    projectile = sprites.create_projectile_from_side(asteroids[randint(0, len(asteroids) - 1)], 0, 75)
    projectile.set_kind(SpriteKind.enemy)
    projectile.x = randint(10, 150)
game.on_update_interval(500, on_update_interval)

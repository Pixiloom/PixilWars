namespace SpriteKind {
    export const boss = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-3)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 1 1 . . . 
        . . . 1 1 . . . 
        . . . 1 1 . . . 
        . . . 1 1 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
    music.bigCrash.play()
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprite.destroy()
    music.baDing.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(3)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let ship: Sprite = null
let asteroids = [img`
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
    `, img`
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
    `]
ship = sprites.create(img`
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
    `, SpriteKind.Player)
let boss2 = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . 2 . . . . . . 2 . . . . . . 
    . . 2 . . . . . . 2 . . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . 2 2 1 2 2 2 2 1 2 2 . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . 2 1 2 2 2 2 2 2 1 2 . . . . . 
    . 2 2 1 1 1 1 1 1 2 2 . . . . . 
    . 2 2 2 2 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
let health = [img`
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
    `, img`
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
    `]
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
music.playMelody("A F E F A F E F ", 90)
music.playMelody("A F E F C5 B A - ", 90)
game.onUpdateInterval(5000, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Food)
    projectile.x = randint(10, 150)
})
game.onUpdateInterval(5000, function () {
    projectile = sprites.createProjectileFromSide(boss2[randint(0, boss2.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.boss)
    projectile.x = randint(10, 150)
    boss2 = [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 . . . . . . 2 . . . . . . 
        . . 2 . . . . . . 2 . . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 2 1 2 2 2 2 1 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . 2 1 2 2 2 2 2 2 1 2 . . . . . 
        . 2 2 1 1 1 1 1 1 2 2 . . . . . 
        . 2 2 2 2 2 2 2 2 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `]
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})

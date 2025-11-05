/**
 * Mixins - Comprehensive examples
 * 
 * Mixins allow you to build classes by combining simpler partial classes.
 * This pattern is useful for creating reusable components that can be
 * composed together to build more complex classes.
 * 
 * Based on TypeScript Handbook: Mixins
 */

// ============================================================================
// BASIC MIXIN PATTERN - How Mixins Work
// ============================================================================

// Base class that will have mixins applied on top
class Sprite {
  name = "";
  x = 0;
  y = 0;

  constructor(name: string) {
    this.name = name;
  }
}

// Type for constructor functions - used to extend other classes
type Constructor = new (...args: any[]) => {};

// Mixin: Adds scaling functionality
function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // Mixins may not declare private/protected properties
    // However, you can use ES2020 private fields
    _scale = 1;

    setScale(scale: number) {
      this._scale = scale;
    }

    get scale(): number {
      return this._scale;
    }
  };
}

// Mixin: Adds rotation functionality
function Rotatable<TBase extends Constructor>(Base: TBase) {
  return class Rotatable extends Base {
    _rotation = 0;

    setRotation(angle: number) {
      this._rotation = angle;
    }

    get rotation(): number {
      return this._rotation;
    }

    rotate(angle: number) {
      this._rotation += angle;
    }
  };
}

// Mixin: Adds color functionality
function Colorable<TBase extends Constructor>(Base: TBase) {
  return class Colorable extends Base {
    _color = "#000000";

    setColor(color: string) {
      this._color = color;
    }

    get color(): string {
      return this._color;
    }
  };
}

// ============================================================================
// COMPOSING CLASSES WITH MIXINS
// ============================================================================

// Compose a new class from Sprite with Scale mixin
const ScaledSprite = Scale(Sprite);
const scaledSprite = new ScaledSprite("Bird");
scaledSprite.setScale(0.8);
console.log(scaledSprite.scale); // 0.8
console.log(scaledSprite.name); // "Bird" - from base class

// Compose with multiple mixins
const ScaledRotatableSprite = Rotatable(Scale(Sprite));
const sprite = new ScaledRotatableSprite("Player");
sprite.setScale(1.5);
sprite.setRotation(45);
sprite.rotate(10);
console.log(sprite.scale); // 1.5
console.log(sprite.rotation); // 55

// Compose with all three mixins
const FullFeaturedSprite = Colorable(Rotatable(Scale(Sprite)));
const fullSprite = new FullFeaturedSprite("Enemy");
fullSprite.setScale(2.0);
fullSprite.setRotation(90);
fullSprite.setColor("#FF0000");
console.log(fullSprite.scale); // 2.0
console.log(fullSprite.rotation); // 90
console.log(fullSprite.color); // "#FF0000"

// ============================================================================
// CONSTRAINED MIXINS
// ============================================================================

// Generic constructor type that accepts a constraint
type GConstructor<T = {}> = new (...args: any[]) => T;

// Define interfaces for constraints
interface Positionable {
  setPos(x: number, y: number): void;
  x: number;
  y: number;
}

interface Drawable {
  draw(): void;
}

interface Animated {
  animate(): void;
}

// Create constrained constructor types
type PositionableConstructor = GConstructor<Positionable>;
type DrawableConstructor = GConstructor<Drawable>;
type SpritableConstructor = GConstructor<Sprite>;

// Base class that implements Positionable
class GameObject implements Positionable {
  x = 0;
  y = 0;

  setPos(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

// Constrained mixin: Only works with Positionable base classes
function Jumpable<TBase extends PositionableConstructor>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      // This mixin only works if the base class has setPos
      // because of the Positionable constraint
      this.setPos(this.x, this.y + 20);
    }

    jumpTo(x: number, y: number) {
      this.setPos(x, y);
    }
  };
}

// Constrained mixin: Only works with Drawable base classes
function DrawableMixin<TBase extends DrawableConstructor>(Base: TBase) {
  return class DrawableMixin extends Base {
    render() {
      this.draw();
      console.log("Rendering...");
    }
  };
}

// Usage of constrained mixins
const JumpableGameObject = Jumpable(GameObject);
const jumpable = new JumpableGameObject();
jumpable.setPos(10, 10);
jumpable.jump();
console.log(jumpable.x, jumpable.y); // 10, 30

// ============================================================================
// PRACTICAL EXAMPLE: Game Entity System
// ============================================================================

// Base entity class
class Entity {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// Health mixin
function WithHealth<TBase extends Constructor>(Base: TBase) {
  return class WithHealth extends Base {
    _health = 100;
    _maxHealth = 100;

    get health(): number {
      return this._health;
    }

    get maxHealth(): number {
      return this._maxHealth;
    }

    takeDamage(amount: number): void {
      this._health = Math.max(0, this._health - amount);
    }

    heal(amount: number): void {
      this._health = Math.min(this._maxHealth, this._health + amount);
    }

    isAlive(): boolean {
      return this._health > 0;
    }
  };
}

// Attack mixin
function WithAttack<TBase extends Constructor>(Base: TBase) {
  return class WithAttack extends Base {
    _damage = 10;
    _attackRange = 1;

    attack(target: any): void {
      if (target.takeDamage) {
        target.takeDamage(this._damage);
      }
    }

    setDamage(damage: number): void {
      this._damage = damage;
    }

    get damage(): number {
      return this._damage;
    }
  };
}

// Movement mixin
function WithMovement<TBase extends Constructor>(Base: TBase) {
  return class WithMovement extends Base {
    _speed = 5;

    move(dx: number, dy: number): void {
      if ("x" in this && "y" in this) {
        (this as any).x += dx * this._speed;
        (this as any).y += dy * this._speed;
      }
    }

    setSpeed(speed: number): void {
      this._speed = speed;
    }

    get speed(): number {
      return this._speed;
    }
  };
}

// Position mixin
function WithPosition<TBase extends Constructor>(Base: TBase) {
  return class WithPosition extends Base {
    x = 0;
    y = 0;

    setPosition(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }

    getPosition(): { x: number; y: number } {
      return { x: this.x, y: this.y };
    }
  };
}

// Compose different entity types
const BasicEntity = WithPosition(Entity);
const HealthEntity = WithHealth(WithPosition(Entity));
const CombatEntity = WithAttack(WithHealth(WithPosition(Entity)));
const FullEntity = WithMovement(WithAttack(WithHealth(WithPosition(Entity))));

// Usage examples
const player = new FullEntity("player1", "Player");
player.setPosition(10, 20);
player.setSpeed(10);
player.setDamage(25);
player.takeDamage(30);
console.log(player.health); // 70
console.log(player.isAlive()); // true

const enemy = new CombatEntity("enemy1", "Enemy");
enemy.setPosition(15, 25);
enemy.setDamage(15);
player.attack(enemy);
console.log(enemy.health); // 85

// ============================================================================
// ALTERNATIVE PATTERN - applyMixins
// ============================================================================

// This pattern creates both runtime and type hierarchies separately,
// then merges them at the end

// Each mixin is a traditional ES class
class JumpableMixin {
  jump() {
    console.log("Jumping!");
  }

  jumpHeight = 10;
}

class DuckableMixin {
  duck() {
    console.log("Ducking!");
  }

  duckHeight = 5;
}

class FlyableMixin {
  fly() {
    console.log("Flying!");
  }

  flySpeed = 20;
}

// Base class
class Character {
  x = 0;
  y = 0;
  name = "";

  constructor(name: string) {
    this.name = name;
  }
}

// Create interface that merges mixins with the base class
interface Character extends JumpableMixin, DuckableMixin, FlyableMixin {}

// Apply mixins at runtime
applyMixins(Character, [JumpableMixin, DuckableMixin, FlyableMixin]);

// Helper function to apply mixins
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

// Usage
const character = new Character("Hero");
character.jump(); // "Jumping!"
character.duck(); // "Ducking!"
character.fly(); // "Flying!"
console.log(character.x, character.y); // 0, 0
console.log(character.jumpHeight); // 10
console.log(character.duckHeight); // 5
console.log(character.flySpeed); // 20

// ============================================================================
// CONSTRAINTS AND LIMITATIONS
// ============================================================================

// ============================================================================
// 1. Decorators and Mixins
// ============================================================================

/*
You cannot use decorators to provide mixins via code flow analysis:

const Pausable = (target: typeof Player) => {
  return class Pausable extends target {
    shouldFreeze = false;
  };
};

@Pausable
class Player {
  x = 0;
  y = 0;
}

// The Player class does not have the decorator's type merged
const player = new Player();
player.shouldFreeze; // Error: Property 'shouldFreeze' does not exist

// Workaround: Use type composition
type FreezablePlayer = Player & { shouldFreeze: boolean };
const playerTwo = new Player() as unknown as FreezablePlayer;
playerTwo.shouldFreeze; // Works
*/

// ============================================================================
// 2. Static Property Mixins
// ============================================================================

// The class expression pattern creates singletons, so they can't be mapped
// at the type system to support different variable types.

// Workaround: Use functions to return classes which differ based on a generic
function base<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}

function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}

class Spec extends derived<string>() {}

// Usage
Spec.prop = "Hello";
Spec.anotherProp = "World";
console.log(Spec.prop); // string
console.log(Spec.anotherProp); // string

// ============================================================================
// ADVANCED EXAMPLE: Plugin System
// ============================================================================

// Base plugin interface
interface Plugin {
  name: string;
  version: string;
  initialize(): void;
}

type PluginConstructor = GConstructor<Plugin>;

// Plugin mixins
function WithLogging<TBase extends PluginConstructor>(Base: TBase) {
  return class WithLogging extends Base {
    log(message: string): void {
      console.log(`[${this.name}] ${message}`);
    }
  };
}

function WithConfig<TBase extends PluginConstructor>(Base: TBase) {
  return class WithConfig extends Base {
    _config: Record<string, any> = {};

    setConfig(key: string, value: any): void {
      this._config[key] = value;
    }

    getConfig(key: string): any {
      return this._config[key];
    }
  };
}

// Base plugin class
class BasePlugin implements Plugin {
  name: string;
  version: string;

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }

  initialize(): void {
    console.log(`Initializing ${this.name} v${this.version}`);
  }
}

// Compose plugin with mixins
const EnhancedPlugin = WithConfig(WithLogging(BasePlugin));

const plugin = new EnhancedPlugin("MyPlugin", "1.0.0");
plugin.initialize();
plugin.log("Plugin started");
plugin.setConfig("debug", true);
console.log(plugin.getConfig("debug")); // true

// ============================================================================
// ADVANCED EXAMPLE: UI Component System
// ============================================================================

// Base component
class Component {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

// Mixins for UI components
function WithVisibility<TBase extends Constructor>(Base: TBase) {
  return class WithVisibility extends Base {
    _visible = true;

    show(): void {
      this._visible = true;
    }

    hide(): void {
      this._visible = false;
    }

    get visible(): boolean {
      return this._visible;
    }
  };
}

function WithStyling<TBase extends Constructor>(Base: TBase) {
  return class WithStyling extends Base {
    _styles: Record<string, string> = {};

    setStyle(property: string, value: string): void {
      this._styles[property] = value;
    }

    getStyle(property: string): string {
      return this._styles[property] || "";
    }

    get styles(): Record<string, string> {
      return { ...this._styles };
    }
  };
}

function WithEvents<TBase extends Constructor>(Base: TBase) {
  return class WithEvents extends Base {
    _handlers: Map<string, Function[]> = new Map();

    on(event: string, handler: Function): void {
      if (!this._handlers.has(event)) {
        this._handlers.set(event, []);
      }
      this._handlers.get(event)!.push(handler);
    }

    emit(event: string, ...args: any[]): void {
      const handlers = this._handlers.get(event);
      if (handlers) {
        handlers.forEach((handler) => handler(...args));
      }
    }

    off(event: string, handler?: Function): void {
      if (handler) {
        const handlers = this._handlers.get(event);
        if (handlers) {
          const index = handlers.indexOf(handler);
          if (index > -1) {
            handlers.splice(index, 1);
          }
        }
      } else {
        this._handlers.delete(event);
      }
    }
  };
}

// Compose full-featured component
const FullComponent = WithEvents(WithStyling(WithVisibility(Component)));

const button = new FullComponent("btn1");
button.show();
button.setStyle("color", "blue");
button.setStyle("fontSize", "16px");
button.on("click", () => console.log("Button clicked!"));
button.emit("click"); // "Button clicked!"

// ============================================================================
// BEST PRACTICES
// ============================================================================

/*
1. Use the class expression pattern for better type safety
2. Prefer constrained mixins when you need to ensure base class has certain properties
3. Keep mixins focused and single-purpose
4. Document mixin dependencies clearly
5. Use ES2020 private fields (#field) instead of private properties in mixins
6. Consider the order of mixin application - later mixins can override earlier ones
7. Use the alternative pattern (applyMixins) only when necessary for compatibility
8. Be aware of limitations with decorators and static properties
9. Test mixin composition thoroughly as it can be complex
10. Consider using interfaces to document expected mixin behavior
*/

export {};


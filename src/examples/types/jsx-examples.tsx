/**
 * TypeScript JSX Examples
 * 
 * Comprehensive examples covering all TypeScript JSX features based on the official TypeScript documentation:
 * 
 * Basic Usage:
 * - .tsx file extension
 * - jsx compiler options (preserve, react, react-native, react-jsx, react-jsxdev)
 * 
 * Type Assertions:
 * - The 'as' operator (required in .tsx files)
 * 
 * Type Checking:
 * - Intrinsic elements vs value-based elements
 * - JSX namespace
 * - Function Components
 * - Class Components
 * - Attribute type checking
 * - Children type checking
 * 
 * Advanced Features:
 * - JSX result type
 * - Embedding expressions
 * - React integration
 */

// ============================================================================
// 1. Basic JSX Usage
// ============================================================================

// JSX allows you to write XML-like syntax in TypeScript
const basicJSX = <div>Hello World</div>;

// JSX with attributes
const jsxWithAttributes = (
  <div className="container" id="main">
    <h1>Title</h1>
    <p>Content</p>
  </div>
);

// ============================================================================
// 2. The 'as' Operator (Required in .tsx files)
// ============================================================================

// In .tsx files, you cannot use angle bracket type assertions:
// const foo = <Foo>bar; // Error: JSX syntax conflict

// Instead, you must use the 'as' operator:
interface Foo {
  value: string;
}

const bar: any = { value: "test" };
const foo = bar as Foo; // Correct way to assert types in .tsx files

// The 'as' operator works in both .ts and .tsx files
const numberValue = "123" as unknown as number;

// ============================================================================
// 3. Intrinsic Elements (Lowercase)
// ============================================================================

// Intrinsic elements are HTML/SVG elements that start with lowercase
const intrinsicElements = (
  <div>
    <span>Text</span>
    <button onClick={() => {}}>Click me</button>
    <input type="text" value="test" />
    <img src="image.jpg" alt="Description" />
  </div>
);

// Intrinsic elements are type-checked based on JSX.IntrinsicElements
// If not defined, anything goes (no type checking)
// If defined, only specified elements are allowed

// ============================================================================
// 4. Value-based Elements (Uppercase)
// ============================================================================

// Value-based elements are components you create, starting with uppercase

// Function Component
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting(props: GreetingProps) {
  return <div>Hello, {props.name}!</div>;
}

// Usage
const greetingJSX = <Greeting name="Alice" age={30} />;

// Function Component with arrow function
// Note: React.FC type requires @types/react to be installed
// For this example, we'll use a regular function signature
const Button = (props: { label: string; onClick: () => void }) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};

// Usage
const buttonJSX = <Button label="Click me" onClick={() => console.log("clicked")} />;

// ============================================================================
// 5. Function Components
// ============================================================================

// Function components must return JSX.Element | null
interface ComponentProps {
  title: string;
  count: number;
}

function Component(props: ComponentProps): JSX.Element {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>Count: {props.count}</p>
    </div>
  );
}

// Function component that can return null
function ConditionalComponent(props: { show: boolean }): JSX.Element | null {
  if (!props.show) {
    return null;
  }
  return <div>Visible content</div>;
}

// Function component with overloads
interface ClickableProps {
  children: JSX.Element[] | JSX.Element;
}

interface HomeProps extends ClickableProps {
  home: JSX.Element;
}

interface SideProps extends ClickableProps {
  side: JSX.Element | string;
}

function MainButton(props: HomeProps): JSX.Element;
function MainButton(props: SideProps): JSX.Element;
function MainButton(props: ClickableProps): JSX.Element {
  return <button>{props.children}</button>;
}

// Usage
const homeButton = (
  <MainButton home={<div>Home</div>}>
    <span>Click</span>
  </MainButton>
);

const sideButton = (
  <MainButton side="Side content">
    <span>Click</span>
  </MainButton>
);

// ============================================================================
// 6. Class Components
// ============================================================================

// Class components must have a render method that returns JSX.Element
// Note: React.Component requires @types/react to be installed
// For this example, we'll define a minimal class component structure
interface ClassComponentProps {
  message: string;
}

// Minimal class component (without React.Component dependency)
class ClassComponent {
  props: ClassComponentProps;
  
  constructor(props: ClassComponentProps) {
    this.props = props;
  }
  
  render(): JSX.Element {
    return <div>{this.props.message}</div>;
  }
}

// Usage
const classComponentJSX = <ClassComponent message="Hello from class" />;

// Class component with state
// Note: This is a simplified example. Full React.Component with state requires @types/react
interface CounterState {
  count: number;
}

class Counter {
  state: CounterState;
  
  constructor() {
    this.state = { count: 0 };
  }
  
  setState(newState: Partial<CounterState>) {
    this.state = { ...this.state, ...newState };
  }

  render(): JSX.Element {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// ============================================================================
// 7. Attribute Type Checking
// ============================================================================

// For intrinsic elements, attributes are checked against JSX.IntrinsicElements
// For value-based elements, attributes are checked against component props

// Example with custom intrinsic element (if JSX.IntrinsicElements is extended)
declare namespace JSX {
  interface IntrinsicElements {
    customElement: {
      requiredProp: string;
      optionalProp?: number;
      onClick?: () => void;
    };
  }
}

// This would work if customElement is defined in JSX.IntrinsicElements
// const custom = <customElement requiredProp="test" optionalProp={5} />;

// For value-based elements, props are type-checked
interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

function TypedButton(props: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

// Correct usage
const typedButton = (
  <TypedButton label="Submit" onClick={() => {}} />
);

// Type errors (commented out):
// <TypedButton /> // Error: missing required prop 'label'
// <TypedButton label={123} /> // Error: label should be string
// <TypedButton label="test" onClick="not a function" /> // Error: onClick should be function

// Spread operator works with attributes
const buttonProps: ButtonProps = {
  label: "Click me",
  onClick: () => {},
  disabled: false,
};

const spreadButton = <TypedButton {...buttonProps} />;

// ============================================================================
// 8. Children Type Checking
// ============================================================================

// Children can be typed as JSX.Element, JSX.Element[], or other types

// Component with single child
interface SingleChildProps {
  children: JSX.Element;
  title: string;
}

function SingleChildComponent(props: SingleChildProps) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}

// Correct usage - single child
const singleChild = (
  <SingleChildComponent title="Title">
    <p>Single child content</p>
  </SingleChildComponent>
);

// Component with multiple children
interface MultipleChildrenProps {
  children: JSX.Element[];
  name: string;
}

function MultipleChildrenComponent(props: MultipleChildrenProps) {
  return (
    <div>
      <h2>{props.name}</h2>
      {props.children}
    </div>
  );
}

// Correct usage - multiple children
const multipleChildren = (
  <MultipleChildrenComponent name="Items">
    <div>Item 1</div>
    <div>Item 2</div>
  </MultipleChildrenComponent>
);

// Component with flexible children
// Note: React.ReactNode requires @types/react. Using JSX.Element | string | number for this example
interface FlexibleChildrenProps {
  children: JSX.Element | JSX.Element[] | string | number;
  title: string;
}

function FlexibleChildrenComponent(props: FlexibleChildrenProps) {
  return (
    <div>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}

// Can accept any valid React children
const flexibleChildren = (
  <FlexibleChildrenComponent title="Flexible">
    <div>Element</div>
    <span>Multiple</span>
    {"Text content"}
    {123}
  </FlexibleChildrenComponent>
);

// ============================================================================
// 9. Embedding Expressions
// ============================================================================

// JSX allows embedding JavaScript expressions in curly braces

// String expressions
const stringExpression = <div>{"Hello " + "World"}</div>;

// Number expressions
const numberExpression = <div>{42 + 8}</div>;

// Array expressions
const arrayExpression = (
  <div>
    {[1, 2, 3].map((num) => (
      <span key={num}>{num * 2}</span>
    ))}
  </div>
);

// Conditional expressions
const conditionalExpression = (
  <div>
    {true ? <span>True</span> : <span>False</span>}
    {false && <div>This won't render</div>}
  </div>
);

// Function call expressions
function getGreeting(name: string): string {
  return `Hello, ${name}!`;
}

const functionExpression = <div>{getGreeting("Alice")}</div>;

// Complex expressions
const complexExpression = (
  <div>
    {[1, 2, 3, 4, 5]
      .filter((n) => n % 2 === 0)
      .map((n) => (
        <div key={n}>{n}</div>
      ))}
  </div>
);

// Type errors in expressions are caught
// const errorExpression = <div>{["foo", "bar"].map((i) => <span>{i / 2}</span>)}</div>;
// Error: Cannot divide string by number

// ============================================================================
// 10. JSX Result Type
// ============================================================================

// By default, JSX expressions return JSX.Element (or any if not specified)
const jsxElement: JSX.Element = <div>Content</div>;

// Function components must return JSX.Element | null
function ValidComponent(): JSX.Element {
  return <div>Valid</div>;
}

function ValidNullableComponent(): JSX.Element | null {
  return Math.random() > 0.5 ? <div>Valid</div> : null;
}

// ============================================================================
// 11. React Integration Examples
// ============================================================================

// Component with props (React-like pattern)
interface ReactComponentProps {
  foo: string;
  bar?: number;
}

// Simplified class component (full React.Component requires @types/react)
class ReactComponent {
  props: ReactComponentProps;
  
  constructor(props: ReactComponentProps) {
    this.props = props;
  }
  
  render(): JSX.Element {
    return <span>{this.props.foo}</span>;
  }
}

// Correct usage
const reactComponent = <ReactComponent foo="bar" />;

// Type error (commented out):
// <ReactComponent foo={0} /> // Error: foo should be string

// Functional React component
function FunctionalReactComponent(props: ReactComponentProps): JSX.Element {
  return <div>{props.foo}</div>;
}

const functionalReact = <FunctionalReactComponent foo="test" bar={42} />;

// ============================================================================
// 12. Advanced: Custom JSX Namespace
// ============================================================================

// You can extend JSX namespace for custom types
declare namespace JSX {
  interface IntrinsicElements {
    myCustomElement: {
      required: string;
      optional?: number;
    };
  }

  interface ElementAttributesProperty {
    props: {}; // specify the property name to use
  }

  interface ElementChildrenAttribute {
    children: {}; // specify children name to use
  }

  interface ElementClass {
    render(): JSX.Element;
  }

  interface Element {
    // JSX.Element is a black box type
    // In practice, this would be React.ReactElement when using React
  }
}

// ============================================================================
// 13. Component Composition
// ============================================================================

// Composing multiple components
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card(props: CardProps) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

interface ListProps {
  items: string[];
}

function List(props: ListProps) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Composed usage
const composed = (
  <Card title="My List">
    <List items={["Item 1", "Item 2", "Item 3"]} />
  </Card>
);

// ============================================================================
// 14. Event Handlers
// ============================================================================

// Event handlers are properly typed
// Note: React.MouseEvent requires @types/react. Using simplified types for this example
interface ButtonWithEventsProps {
  onClick: (event: MouseEvent) => void;
  onMouseEnter: (event: MouseEvent) => void;
  label: string;
}

function ButtonWithEvents(props: ButtonWithEventsProps) {
  return (
    <button onClick={props.onClick} onMouseEnter={props.onMouseEnter}>
      {props.label}
    </button>
  );
}

const eventButton = (
  <ButtonWithEvents
    label="Click me"
    onClick={(e) => console.log("Clicked", e.target)}
    onMouseEnter={(e) => console.log("Mouse entered", e.clientX)}
  />
);

// ============================================================================
// 15. Fragments
// ============================================================================

// React Fragments allow returning multiple elements without a wrapper
// Note: Fragment syntax requires React types or JSX namespace configuration
function FragmentExample() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  );
}

// Alternative: Return array of elements (works without Fragment)
function FragmentExample2() {
  return (
    [
      <div key="1">Item 1</div>,
      <div key="2">Item 2</div>
    ] as any as JSX.Element
  );
}

// ============================================================================
// 16. Conditional Rendering
// ============================================================================

interface ConditionalProps {
  condition: boolean;
  trueContent: JSX.Element;
  falseContent?: JSX.Element;
}

function ConditionalRendering(props: ConditionalProps) {
  return (
    <div>
      {props.condition ? props.trueContent : props.falseContent || null}
      {props.condition && <div>Only shows when true</div>}
    </div>
  );
}

const conditional = (
  <ConditionalRendering
    condition={true}
    trueContent={<div>True content</div>}
    falseContent={<div>False content</div>}
  />
);

// ============================================================================
// 17. Lists and Keys
// ============================================================================

interface ListItem {
  id: number;
  name: string;
}

interface ListComponentProps {
  items: ListItem[];
}

function ListComponent(props: ListComponentProps) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

const listComponent = (
  <ListComponent
    items={[
      { id: 1, name: "First" },
      { id: 2, name: "Second" },
      { id: 3, name: "Third" },
    ]}
  />
);

// ============================================================================
// 18. Default Props
// ============================================================================

interface DefaultPropsExampleProps {
  title: string;
  count?: number;
  enabled?: boolean;
}

function DefaultPropsExample(props: DefaultPropsExampleProps) {
  const count = props.count ?? 0;
  const enabled = props.enabled ?? true;

  return (
    <div>
      <h2>{props.title}</h2>
      <p>Count: {count}</p>
      <p>Enabled: {enabled ? "Yes" : "No"}</p>
    </div>
  );
}

const defaultPropsExample = <DefaultPropsExample title="Test" />;

// ============================================================================
// 19. Refs (for Class Components)
// ============================================================================

// Refs (for Class Components)
// Note: React.createRef requires @types/react. Using simplified approach
class RefExample {
  private inputRef: HTMLInputElement | null = null;

  focusInput = () => {
    this.inputRef?.focus();
  };

  render(): JSX.Element {
    return (
      <div>
        <input ref={(el) => { this.inputRef = el; }} type="text" />
        <button onClick={this.focusInput}>Focus Input</button>
      </div>
    );
  }
}

// ============================================================================
// 20. Higher-Order Components Pattern
// ============================================================================

// Higher-Order Components Pattern
// Note: React.ComponentType requires @types/react. Using function component type
type ComponentType<P = {}> = (props: P) => JSX.Element;

function withLoading<P extends object>(
  Component: ComponentType<P>
): ComponentType<P & { loading?: boolean }> {
  return function WithLoadingComponent(props: P & { loading?: boolean }) {
    if (props.loading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} />;
  };
}

interface DataProps {
  data: string;
}

function DataComponent(props: DataProps) {
  return <div>Data: {props.data}</div>;
}

const DataComponentWithLoading = withLoading(DataComponent);

const hocExample = <DataComponentWithLoading data="test" loading={false} />;

// ============================================================================
// Export Examples
// ============================================================================

export {
  Greeting,
  Button,
  Component,
  ConditionalComponent,
  MainButton,
  ClassComponent,
  Counter,
  TypedButton,
  SingleChildComponent,
  MultipleChildrenComponent,
  FlexibleChildrenComponent,
  ValidComponent,
  ValidNullableComponent,
  ReactComponent,
  FunctionalReactComponent,
  Card,
  List,
  ButtonWithEvents,
  FragmentExample,
  FragmentExample2,
  ConditionalRendering,
  ListComponent,
  DefaultPropsExample,
  RefExample,
  DataComponent,
  DataComponentWithLoading,
};

// ============================================================================
// Setup Requirements
// ============================================================================
// 
// This file demonstrates JSX syntax in TypeScript. To use JSX:
// 
// 1. File extension must be .tsx (not .ts)
// 
// 2. tsconfig.json must have jsx option set:
//    {
//      "compilerOptions": {
//        "jsx": "react"  // or "react-jsx", "preserve", "react-native", "react-jsxdev"
//      }
//    }
// 
// 3. For full React integration, install React types:
//    npm install --save-dev @types/react @types/react-dom
// 
// 4. JSX modes:
//    - "preserve": Keep JSX in output (.jsx files)
//    - "react": Emit React.createElement (classic runtime)
//    - "react-jsx": Emit _jsx() (automatic runtime)
//    - "react-jsxdev": Emit _jsxDEV() (automatic dev runtime)
//    - "react-native": Keep JSX (.js files)
// 
// Note: This file uses simplified types to work without React installed.
// For production React code, use @types/react for full type support.


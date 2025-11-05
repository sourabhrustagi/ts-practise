/**
 * Ambient Namespace Declarations
 * 
 * This file demonstrates how to declare types for JavaScript libraries
 * using ambient namespaces. These declarations are typically in .d.ts files.
 * 
 * Ambient declarations tell TypeScript about the shape of libraries
 * that don't have TypeScript definitions.
 */

// ============================================================================
// EXAMPLE 1: D3 Library (Simplified)
// ============================================================================

declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection;
      (element: EventTarget): Selection;
      (element: Element): Selection;
    };
  }

  export interface Event {
    x: number;
    y: number;
    type: string;
    target: EventTarget;
  }

  export interface Base extends Selectors {
    event: Event;
    version: string;
  }

  export interface Selection {
    append(type: string): Selection;
    attr(name: string, value?: string): Selection;
    style(name: string, value?: string): Selection;
    text(): string;
    text(content: string): Selection;
    data<T>(data: T[]): Selection;
    enter(): Selection;
    exit(): Selection;
    remove(): Selection;
  }

  export interface Scale {
    (value: number): number;
    domain(values: number[]): Scale;
    range(values: number[]): Scale;
  }
}

// Declare the global d3 variable
declare var d3: D3.Base;

// Usage (would work if d3.js is loaded):
// const selection = d3.select("#my-element");
// selection.append("div").attr("class", "container");
// const scale = d3.scaleLinear().domain([0, 100]).range([0, 500]);

// ============================================================================
// EXAMPLE 2: jQuery Library (Simplified)
// ============================================================================

declare namespace jQuery {
  export interface AjaxSettings {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    data?: any;
    dataType?: "json" | "xml" | "html" | "text";
    headers?: Record<string, string>;
    success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => void;
    error?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void;
    complete?: (jqXHR: JQueryXHR, textStatus: string) => void;
  }

  export interface JQueryXHR {
    status: number;
    statusText: string;
    responseText: string;
    responseJSON?: any;
  }

  export interface JQuery {
    (selector: string): JQuery;
    (element: Element): JQuery;
    (elements: Element[]): JQuery;
    (callback: () => void): JQuery;

    // DOM manipulation
    html(): string;
    html(htmlString: string): JQuery;
    text(): string;
    text(text: string): JQuery;
    val(): any;
    val(value: any): JQuery;
    attr(name: string): string;
    attr(name: string, value: string): JQuery;
    css(property: string): string;
    css(property: string, value: string): JQuery;
    addClass(className: string): JQuery;
    removeClass(className: string): JQuery;
    toggleClass(className: string): JQuery;

    // Events
    on(event: string, handler: (event: Event) => void): JQuery;
    off(event: string, handler?: (event: Event) => void): JQuery;
    click(handler?: (event: Event) => void): JQuery;
    change(handler?: (event: Event) => void): JQuery;
    submit(handler?: (event: Event) => void): JQuery;

    // Traversal
    find(selector: string): JQuery;
    parent(): JQuery;
    children(selector?: string): JQuery;
    next(): JQuery;
    prev(): JQuery;
    siblings(selector?: string): JQuery;

    // AJAX
    ajax(settings: AjaxSettings): JQueryXHR;
    get(url: string, data?: any, success?: (data: any) => void): JQueryXHR;
    post(url: string, data?: any, success?: (data: any) => void): JQueryXHR;

    // Utility
    each(callback: (index: number, element: Element) => void): JQuery;
    length: number;
    [index: number]: Element;
  }

  export interface JQueryStatic extends JQuery {
    ajax(settings: AjaxSettings): JQueryXHR;
    get(url: string, data?: any, success?: (data: any) => void): JQueryXHR;
    post(url: string, data?: any, success?: (data: any) => void): JQueryXHR;
    ready(callback: () => void): void;
    extend(target: any, ...objects: any[]): any;
    each<T>(array: T[], callback: (index: number, value: T) => void): void;
    each<T>(object: Record<string, T>, callback: (key: string, value: T) => void): void;
  }
}

// Declare global jQuery variables
declare var $: jQuery.JQueryStatic;
declare var jQuery: jQuery.JQueryStatic;

// Usage (would work if jQuery is loaded):
// $(document).ready(() => {
//   $("#my-button").click(() => {
//     $.ajax({
//       url: "/api/data",
//       method: "GET",
//       success: (data) => console.log(data)
//     });
//   });
// });

// ============================================================================
// EXAMPLE 3: Custom Library Declaration
// ============================================================================

declare namespace MyLibrary {
  export interface Config {
    apiKey: string;
    timeout?: number;
    retries?: number;
  }

  export interface Response<T> {
    success: boolean;
    data: T;
    message?: string;
  }

  export interface Client {
    get<T>(endpoint: string): Promise<Response<T>>;
    post<T>(endpoint: string, data: any): Promise<Response<T>>;
    put<T>(endpoint: string, data: any): Promise<Response<T>>;
    delete<T>(endpoint: string): Promise<Response<T>>;
  }

  export namespace Utils {
    export function formatDate(date: Date): string;
    export function parseJSON(json: string): any;
    export function debounce<T extends (...args: any[]) => any>(
      func: T,
      wait: number
    ): T;
  }

  export function createClient(config: Config): Client;
}

// Declare global library variable
declare var MyLib: typeof MyLibrary;

// Usage (would work if MyLibrary.js is loaded):
// const client = MyLib.createClient({ apiKey: "abc123" });
// const response = await client.get<User[]>("/users");
// const formatted = MyLib.Utils.formatDate(new Date());

// ============================================================================
// EXAMPLE 4: Lodash-like Library (Simplified)
// ============================================================================

declare namespace _ {
  export interface LoDashStatic {
    // Array methods
    chunk<T>(array: T[], size?: number): T[][];
    compact<T>(array: (T | null | undefined | false | 0 | "")[]): T[];
    concat<T>(...arrays: T[][]): T[];
    difference<T>(array: T[], ...values: T[][]): T[];
    drop<T>(array: T[], n?: number): T[];
    dropRight<T>(array: T[], n?: number): T[];
    fill<T>(array: T[], value: T, start?: number, end?: number): T[];
    find<T>(array: T[], predicate: (value: T) => boolean): T | undefined;
    flatten<T>(array: (T | T[])[]): T[];
    flattenDeep<T>(array: any[]): T[];
    head<T>(array: T[]): T | undefined;
    includes<T>(collection: T[] | Record<string, T>, value: T): boolean;
    intersection<T>(...arrays: T[][]): T[];
    last<T>(array: T[]): T | undefined;
    reverse<T>(array: T[]): T[];
    take<T>(array: T[], n?: number): T[];
    union<T>(...arrays: T[][]): T[];
    uniq<T>(array: T[]): T[];
    without<T>(array: T[], ...values: T[]): T[];

    // Collection methods
    each<T>(collection: T[] | Record<string, T>, iteratee: (value: T, index: number | string) => void): T[] | Record<string, T>;
    map<T, U>(collection: T[] | Record<string, T>, iteratee: (value: T, index: number | string) => U): U[];
    filter<T>(collection: T[] | Record<string, T>, predicate: (value: T) => boolean): T[];
    reduce<T, U>(collection: T[] | Record<string, T>, iteratee: (acc: U, value: T) => U, accumulator: U): U;
    find<T>(collection: T[] | Record<string, T>, predicate: (value: T) => boolean): T | undefined;
    some<T>(collection: T[] | Record<string, T>, predicate: (value: T) => boolean): boolean;
    every<T>(collection: T[] | Record<string, T>, predicate: (value: T) => boolean): boolean;
    groupBy<T>(collection: T[], iteratee: (value: T) => string): Record<string, T[]>;
    keyBy<T>(collection: T[], iteratee: (value: T) => string): Record<string, T>;
    orderBy<T>(collection: T[], iteratees: ((value: T) => any)[], orders?: ("asc" | "desc")[]): T[];

    // Object methods
    keys(object: Record<string, any>): string[];
    values<T>(object: Record<string, T>): T[];
    entries<T>(object: Record<string, T>): [string, T][];
    assign<T, U>(target: T, source: U): T & U;
    merge<T, U>(target: T, source: U): T & U;
    omit<T>(object: T, ...keys: string[]): Partial<T>;
    pick<T>(object: T, ...keys: string[]): Partial<T>;
    clone<T>(value: T): T;
    cloneDeep<T>(value: T): T;
    isEqual(value: any, other: any): boolean;
    isEmpty(value: any): boolean;

    // Function methods
    debounce<T extends (...args: any[]) => any>(func: T, wait: number): T;
    throttle<T extends (...args: any[]) => any>(func: T, wait: number): T;
    curry<T extends (...args: any[]) => any>(func: T): T;
    partial<T extends (...args: any[]) => any>(func: T, ...partials: any[]): T;

    // Utility methods
    random(lower?: number, upper?: number, floating?: boolean): number;
    range(start: number, end?: number, step?: number): number[];
    times<T>(n: number, iteratee: (index: number) => T): T[];
    now(): number;
    noop(): void;
  }
}

declare var _: _.LoDashStatic;

// Usage (would work if lodash is loaded):
// const chunked = _.chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
// const unique = _.uniq([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]
// const grouped = _.groupBy(users, (user) => user.age);

// ============================================================================
// EXAMPLE 5: Global Variables with Namespace
// ============================================================================

declare namespace Window {
  export interface MyApp {
    version: string;
    config: {
      apiUrl: string;
      environment: string;
    };
    init(): void;
  }
}

interface Window {
  MyApp: Window.MyApp;
}

// Usage (would work in browser):
// window.MyApp.init();
// console.log(window.MyApp.version);

// ============================================================================
// BEST PRACTICES FOR AMBIENT DECLARATIONS
// ============================================================================

/*
1. Place ambient declarations in .d.ts files
2. Use namespaces to organize library APIs
3. Export interfaces and types that represent the library's shape
4. Declare global variables using declare var
5. Use interfaces to describe complex object shapes
6. Document your declarations with comments
7. Consider contributing to @types packages for popular libraries
8. Test your declarations with actual library usage
9. Keep declarations in sync with library versions
10. Use module augmentation for extending existing types
*/

export {};


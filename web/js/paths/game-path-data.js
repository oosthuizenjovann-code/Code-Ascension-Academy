const UNITY = {
  gameDevelopment: 'https://learn.unity.com/pathway/game-development',
  juniorProgrammer: 'https://learn.unity.com/pathway/junior-programmer',
  playerControl: 'https://learn.unity.com/pathway/junior-programmer/unit/player-control?version=6',
  basicGameplay: 'https://learn.unity.com/pathway/junior-programmer/unit/basic-gameplay',
  sceneFlow: 'https://learn.unity.com/pathway/junior-programmer/unit/manage-scene-flow-and-data',
  inputSystem: 'https://docs.unity3d.com/6000.0/Manual/com.unity.inputsystem.html',
  physics2d: 'https://docs.unity3d.com/6000.0/ScriptReference/UnityEngine.Physics2DModule.html',
  prefabs: 'https://docs.unity3d.com/6000.0/Manual/CreatingPrefabs.html',
  objectPool: 'https://docs.unity3d.com/6000.0/ScriptReference/Pool.IObjectPool_1.html',
  uiToolkit: 'https://docs.unity3d.com/6000.0/Manual/ui-systems/introduction-ui-toolkit.html'
};

const ref = (title, url) => ({ title, url });
const hasAll = (...needles) => code => needles.every(needle => String(code).toLowerCase().includes(String(needle).toLowerCase()));
const hasAny = (...needles) => code => needles.some(needle => String(code).toLowerCase().includes(String(needle).toLowerCase()));

export const GAME_PATH = {
  id: 'gameDevelopment',
  title: 'Game Development Foundations',
  subtitle: 'UNITY + C# GAME PROGRAMMING',
  description: 'Learn transferable game-programming systems in real C#, then map each concept into current Unity workflows with official Unity references.',
  unlockRule: 'Complete C# Intern and reach C# Junior.',
  missions: [
    {
      title: 'The Game Loop, Time & Components',
      summary: 'Understand frame-based updates, delta time, component-style responsibilities and why gameplay logic must be separated into small systems.',
      unityTranslation: 'Unity gameplay scripts commonly attach behavior to GameObjects through components. Frame logic is usually driven by engine callbacks, while time-scaled motion uses elapsed time rather than assuming a fixed frame rate.',
      concepts: ['game loop', 'delta time', 'component responsibility', 'frame-rate independence', 'update order'],
      references: [
        ref('Unity Game Development Pathway', UNITY.gameDevelopment),
        ref('Unity Junior Programmer Pathway', UNITY.juniorProgrammer),
        ref('Unity Player Control mission', UNITY.playerControl)
      ],
      starter: `using System;\n\npublic sealed class PlayerMotor\n{\n    public float Position { get; private set; }\n    public float Speed { get; } = 5f;\n\n    public void Tick(float input, float deltaTime)\n    {\n        // TODO: move using input, speed and deltaTime.\n    }\n}\n\nvar player = new PlayerMotor();\nfor (int frame = 0; frame < 3; frame++)\n{\n    player.Tick(1f, 1f / 60f);\n}\n\nConsole.WriteLine($"Position: {player.Position:F3}");`,
      requirements: [
        { label: 'Uses a Tick/Update-style method with delta time', points: 25, check: code => hasAny('tick(', 'update(')(code) && hasAny('deltatime', 'deltaTime')(code) },
        { label: 'Movement scales by input, speed and elapsed time', points: 25, check: hasAll('input', 'speed', 'delta') },
        { label: 'Separates player movement into its own class/component', points: 20, check: code => /class\s+\w*(motor|controller|movement)/i.test(code) },
        { label: 'Contains a repeatable frame/game loop', points: 15, check: code => /for\s*\(|while\s*\(/i.test(code) },
        { label: 'Prints or exposes a result for verification', points: 15, check: hasAny('console.writeline', 'position { get;') }
      ]
    },
    {
      title: 'Input & Player Movement',
      summary: 'Translate input into movement vectors, normalize diagonal movement, and keep input reading separate from movement execution.',
      unityTranslation: 'Unity 6 supports the Input System package as the extensible alternative to the classic input API. In a Unity project, input actions can drive a movement component rather than being mixed throughout gameplay code.',
      concepts: ['input actions', 'movement vectors', 'normalization', 'separation of input and movement'],
      references: [
        ref('Unity Input System manual', UNITY.inputSystem),
        ref('Unity Player Control mission', UNITY.playerControl)
      ],
      starter: `using System;\nusing System.Numerics;\n\npublic readonly record struct InputState(float Horizontal, float Vertical);\n\npublic static class Movement\n{\n    public static Vector2 Velocity(InputState input, float speed)\n    {\n        var direction = new Vector2(input.Horizontal, input.Vertical);\n        // TODO: prevent faster diagonal movement and return velocity.\n        return Vector2.Zero;\n    }\n}\n\nConsole.WriteLine(Movement.Velocity(new InputState(1, 1), 6));`,
      requirements: [
        { label: 'Represents 2D movement with Vector2', points: 25, check: hasAll('vector2') },
        { label: 'Reads horizontal and vertical input values', points: 20, check: hasAll('horizontal', 'vertical') },
        { label: 'Normalizes or clamps diagonal movement', points: 25, check: code => hasAny('normalize', 'lengthsquared', 'length()')(code) },
        { label: 'Applies a configurable movement speed', points: 15, check: hasAll('speed') },
        { label: 'Keeps movement calculation in a reusable method', points: 15, check: code => /static\s+vector2\s+\w+\s*\(/i.test(code) }
      ]
    },
    {
      title: 'Collisions, Prefabs & Spawning',
      summary: 'Model gameplay entities, spawn reusable templates, detect interaction ranges and separate creation from simulation.',
      unityTranslation: 'Unity uses Collider/Rigidbody systems for physics interactions and Prefab Assets as reusable templates that can be instantiated at runtime. This lab models the programming responsibilities without requiring Unity assemblies.',
      concepts: ['entities', 'collision checks', 'spawning', 'prefab thinking', 'randomized gameplay'],
      references: [
        ref('Unity Basic Gameplay mission', UNITY.basicGameplay),
        ref('Unity 2D Physics API overview', UNITY.physics2d),
        ref('Unity Prefabs manual', UNITY.prefabs)
      ],
      starter: `using System;\nusing System.Collections.Generic;\nusing System.Numerics;\n\npublic sealed record Enemy(Vector2 Position, int Health);\n\npublic sealed class EnemySpawner\n{\n    private readonly Random random = new();\n    public Enemy Spawn() => new(new Vector2(random.Next(-5, 6), random.Next(-5, 6)), 100);\n}\n\nvar enemies = new List<Enemy>();\nvar spawner = new EnemySpawner();\nfor (int i = 0; i < 5; i++) enemies.Add(spawner.Spawn());\n\n// TODO: count enemies within collision/range distance of the origin.\nConsole.WriteLine($"Spawned: {enemies.Count}");`,
      requirements: [
        { label: 'Defines a reusable enemy/entity type', points: 20, check: code => /(?:class|record)\s+enemy/i.test(code) },
        { label: 'Uses a dedicated spawner/factory responsibility', points: 20, check: code => /class\s+\w*spawner/i.test(code) || hasAny('spawn()')(code) },
        { label: 'Creates multiple entities in a collection', points: 20, check: code => hasAny('list<enemy>', 'list<')(code) && /for\s*\(/i.test(code) },
        { label: 'Performs a distance/collision-style check', points: 25, check: code => hasAny('distance', 'length', 'lengthsquared')(code) },
        { label: 'Uses configurable/random spawn data', points: 15, check: hasAny('random', 'next(') }
      ]
    },
    {
      title: 'Game State, UI & Scene Flow',
      summary: 'Control menus, playing/paused/game-over states, expose score/health data and make state transitions explicit.',
      unityTranslation: 'Unity projects commonly coordinate scene flow, runtime UI, menus and persistent application state. The official Junior Programmer pathway specifically covers UI plus scene flow and data management.',
      concepts: ['state machines', 'menus', 'HUD data', 'events', 'scene flow'],
      references: [
        ref('Unity Manage Scene Flow and Data', UNITY.sceneFlow),
        ref('Unity UI Toolkit introduction', UNITY.uiToolkit),
        ref('Unity Junior Programmer Pathway', UNITY.juniorProgrammer)
      ],
      starter: `using System;\n\npublic enum GameState { Menu, Playing, Paused, GameOver }\n\npublic sealed class GameSession\n{\n    public GameState State { get; private set; } = GameState.Menu;\n    public int Score { get; private set; }\n    public event Action<GameState>? StateChanged;\n\n    public void StartGame()\n    {\n        // TODO: change state and notify listeners.\n    }\n}\n\nvar game = new GameSession();\ngame.StateChanged += state => Console.WriteLine($"State: {state}");\ngame.StartGame();`,
      requirements: [
        { label: 'Defines explicit game states', points: 20, check: code => /enum\s+gamestate/i.test(code) },
        { label: 'Stores current game/application state', points: 20, check: hasAll('state { get;') },
        { label: 'Implements a state transition method', points: 20, check: code => /(?:startgame|setstate|changestate)\s*\(/i.test(code) },
        { label: 'Notifies UI/other systems through an event or callback', points: 20, check: hasAny('event action', 'statechanged', 'action<') },
        { label: 'Tracks visible gameplay information such as score/health', points: 20, check: hasAny('score', 'health') }
      ]
    },
    {
      title: 'Performance, Pooling & Debugging',
      summary: 'Reduce repeated allocations by reusing objects, reason about hot paths, and build systems that are easier to inspect when something fails.',
      unityTranslation: 'Unity exposes pooling APIs such as IObjectPool/ObjectPool. Pooling is useful for frequently created gameplay objects such as projectiles or effects when profiling shows repeated creation/destruction is costly.',
      concepts: ['object pooling', 'allocation pressure', 'hot paths', 'profiling mindset', 'debugging'],
      references: [
        ref('Unity IObjectPool API', UNITY.objectPool),
        ref('Unity Junior Programmer Pathway', UNITY.juniorProgrammer)
      ],
      starter: `using System;\nusing System.Collections.Generic;\n\npublic sealed class Projectile\n{\n    public bool Active { get; set; }\n}\n\npublic sealed class ProjectilePool\n{\n    private readonly Stack<Projectile> available = new();\n\n    public Projectile Get()\n    {\n        // TODO: reuse an available projectile or create one.\n        throw new NotImplementedException();\n    }\n\n    public void Release(Projectile projectile)\n    {\n        // TODO: deactivate and return to pool.\n    }\n}\n`,
      requirements: [
        { label: 'Stores reusable objects in a collection', points: 20, check: code => /(?:stack|queue|list)<projectile>/i.test(code) },
        { label: 'Get reuses an existing object when possible', points: 25, check: code => hasAny('.pop(', '.dequeue(', 'available.count')(code) },
        { label: 'Creates an object only when the pool is empty', points: 20, check: code => /new\s+projectile/i.test(code) },
        { label: 'Release returns an object to the pool', points: 20, check: code => hasAny('.push(', '.enqueue(', '.add(')(code) },
        { label: 'Tracks active/inactive state or reset behavior', points: 15, check: hasAny('active', 'reset') }
      ]
    },
    {
      title: 'Architecture, Data & Iteration',
      summary: 'Use interfaces/composition, separate data from behavior, persist small save models and design systems that can grow without one giant manager class.',
      unityTranslation: 'Unity’s current programmer learning material emphasizes OOP, persistence, project management, debugging and reusable systems. This final mission prepares you to translate clean C# architecture into MonoBehaviours, ScriptableObjects and scene-level services.',
      concepts: ['interfaces', 'composition', 'save data', 'persistence', 'architecture boundaries'],
      references: [
        ref('Unity Manage Scene Flow and Data', UNITY.sceneFlow),
        ref('Unity Junior Programmer Pathway', UNITY.juniorProgrammer),
        ref('Unity Game Development Pathway', UNITY.gameDevelopment)
      ],
      starter: `using System;\nusing System.Text.Json;\n\npublic interface IDamageable\n{\n    void TakeDamage(int amount);\n}\n\npublic sealed record SaveData(int HighScore, int Coins);\n\npublic static class SaveSystem\n{\n    public static string Serialize(SaveData data) => JsonSerializer.Serialize(data);\n}\n\nvar json = SaveSystem.Serialize(new SaveData(1200, 40));\nConsole.WriteLine(json);`,
      requirements: [
        { label: 'Uses an interface or explicit abstraction boundary', points: 20, check: code => /interface\s+i\w+/i.test(code) },
        { label: 'Defines a dedicated data/save model', points: 20, check: code => /(?:record|class)\s+savedata/i.test(code) },
        { label: 'Separates persistence into its own service/system', points: 20, check: code => /class\s+savesystem/i.test(code) },
        { label: 'Serializes or otherwise persists data', points: 20, check: hasAny('jsonserializer', 'serialize(') },
        { label: 'Demonstrates composition/reusable responsibilities', points: 20, check: code => (code.match(/class\s+/gi) || []).length + (code.match(/interface\s+/gi) || []).length >= 2 }
      ]
    }
  ],
  capstone: {
    title: '2D Arena Survival Systems Prototype',
    summary: 'Build a console-simulated gameplay core for a small arena-survival game, then use the implementation checklist to reproduce the systems in a real Unity 2D project.',
    unityTranslation: 'The capstone is intentionally split: the Academy verifies your core C# systems, while the Unity checklist asks you to recreate the playable presentation using GameObjects/components, Input System, 2D physics/prefabs, UI and pooling.',
    concepts: ['game loop', 'movement', 'spawning', 'state machine', 'pooling', 'events', 'save data'],
    references: [
      ref('Unity Game Development Pathway', UNITY.gameDevelopment),
      ref('Unity Junior Programmer Pathway', UNITY.juniorProgrammer),
      ref('Unity Input System manual', UNITY.inputSystem),
      ref('Unity 2D Physics API overview', UNITY.physics2d),
      ref('Unity IObjectPool API', UNITY.objectPool)
    ],
    starter: `using System;\nusing System.Collections.Generic;\nusing System.Numerics;\n\npublic enum GameState { Menu, Playing, GameOver }\n\npublic sealed class Player\n{\n    public Vector2 Position { get; private set; }\n    public int Health { get; private set; } = 100;\n    public void Move(Vector2 input, float speed, float dt) { }\n}\n\npublic sealed class Enemy { public Vector2 Position { get; set; } }\npublic sealed class EnemyPool { }\npublic sealed class GameSession { }\n\n// TODO: turn these systems into a small deterministic arena simulation.\nConsole.WriteLine("Arena simulation ready");`,
    requirements: [
      { label: 'Frame-rate independent player movement', points: 15, check: code => hasAll('vector2', 'speed', 'dt') },
      { label: 'Explicit game-state machine', points: 15, check: code => /enum\s+gamestate/i.test(code) && hasAny('playing', 'gameover')(code) },
      { label: 'Enemy spawning/collection system', points: 15, check: code => hasAny('spawner', 'spawn(')(code) && hasAny('list<enemy>', 'enemy[]')(code) },
      { label: 'Collision/range or damage interaction', points: 15, check: code => hasAny('distance', 'collision', 'takedamage', 'damage')(code) },
      { label: 'Pooling/reuse for frequently created objects', points: 15, check: code => hasAny('pool', 'stack<', 'queue<')(code) },
      { label: 'Events/UI-facing gameplay state', points: 10, check: code => hasAny('event action', 'score', 'health')(code) },
      { label: 'Separated gameplay responsibilities across several types', points: 15, check: code => (code.match(/class\s+/gi) || []).length >= 4 }
    ]
  }
};

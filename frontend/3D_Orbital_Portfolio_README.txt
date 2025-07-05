
3D Orbital Portfolio Plan (Three.js)
====================================

Core Concept
------------
- 3D interactive portfolio built with Three.js
- Central orb = “About Me” + CV
- Project categories orbit the central sphere like satellites
- Clicking a category orb:
  - Pauses animation
  - Spawns child orbs representing individual projects
  - Each child orb links to a demo, article, or explanation

Orb Categories
--------------
- Data Science / Analysis
  - Dashboards, data wrangling, visualizations
  - E.g., interactive data dashboard
- Simulations
  - Technical or educational simulations
  - E.g., LPRF waveform simulation (audio + radar explanation)
- Writing / Documentation
  - Technical communication and documentation
  - Radar doc, how-tos, explainers
- Articles / Blogs
  - Thought pieces, dev logs, tutorials
  - Separate from documentation
- University Projects
  - Coursework, academic simulations, signal processing, math
- Live Data / ISS
  - Real-time ISS orb using live API (wheretheiss.at)
  - Clicking reveals coordinates + page with info
- CV / About Me
  - Accessible via central orb
  - Personal statement, downloadable CV, contact links

Visitor Orb System (Optional Feature)
-------------------------------------
- Visitors can spawn their own “I was here” orb
- Temporary orbs appear and fade after time
- Each orb can include a “Connect” button
  - Allows visitors to signal if they recognize someone
  - Creates light social interaction in your portfolio space

Modular File Structure Plan
---------------------------
/project-root/
├── index.html
├── style.css
├── main.js
├── orbit.js
├── update.js
├── /data/
│   └── projectData.js
├── /shapes/
│   └── orb.js
├── /effects/
│   └── glow.js
├── /text/
│   └── labels.js
├── /visitors/
│   └── visitorOrb.js

Visual / Interaction Features
-----------------------------
- Starfield background (starfield.jpg)
- Glowing orbs with THREE.SpriteMaterial + additive blending
- raycasting for mouse-based selection / interactivity
- Optional BVH acceleration for better performance
- Sliders to control:
  - Orbit speed
  - Orbital inclination

Stretch Features & Learning Goals
---------------------------------
- Backend integration (save visitor orbs, comments)
- Use live APIs (satellite tracking, weather, etc.)
- Rebuild in:
  - Rust + WebGPU
  - Unity (for AR/VR)
  - Unreal Engine or Godot
- Deploy via GitHub Pages, Vercel, or Netlify
- Use GitHub Projects / Notion / Trello to track work

Mindset / Learning Reflections
------------------------------
- Learning faster by building, not just studying
- Gained working knowledge of DFS, modular design, BVH
- Recognizing when and how to apply the right algorithm/tool
- Syntax matters less than solving real problems
- Courses are helpful, but building is transformative

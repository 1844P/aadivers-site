const QUESTIONS = [
  {
    id: 1,
    question: "What is the Soufrière Marine Management Area (SMMA)?",
    answer: "The SMMA is a marine protected area along the western coast of Saint Lucia, established to conserve the natural marine environment and ensure sustainable use of marine resources, particularly for fishing and tourism.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Imagine a stretch of Caribbean coastline so rich with life that it needed its own dedicated protection force — that is exactly what the SMMA is! When you descend beneath the waves here, you are entering one of the most carefully managed underwater sanctuaries in all of Saint Lucia."
  },
  {
    id: 2,
    question: "Where is the SMMA located?",
    answer: "It extends from Marigot Bay to Anse La Raye on the leeward (western) coast of Saint Lucia, encompassing the Soufrière region.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "That leeward western coastline is a diver's dream because the island's mountains shield it from the harshest Atlantic swells, giving you crystal-clear, calm waters to explore. The entire stretch from Marigot Bay to Anse La Raye is practically an underwater theme park waiting to be explored."
  },
  {
    id: 3,
    question: "What are the five zones within the SMMA?",
    answer: "Marine Reserves, Fishing Priority Areas, Multiple Use Areas, Yacht Mooring Areas, and Recreational Areas.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Think of the SMMA like a carefully choreographed dance floor — every zone has its own rules so that fishermen, divers, and yachters can all share the ocean without stepping on each other's fins. The zoning system is what makes this marine area such a success story for balancing people and nature."
  },
  {
    id: 4,
    question: "What is the primary goal of the Marine Reserves zone?",
    answer: "To protect critical habitats by prohibiting fishing and other extractive activities, allowing ecosystems to recover and thrive.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "When you float inside a Marine Reserve, you are essentially peering into what a Caribbean reef looked like centuries ago — fish swarm in such numbers they almost block out the sunlight. These no-take zones are the beating heart of reef recovery, and you can literally see the difference the moment you drop in."
  },
  {
    id: 5,
    question: "Which activities are allowed in the Fishing Priority Areas?",
    answer: "Traditional fishing is permitted, but regulated to ensure sustainable harvest levels.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Local fishers here still use knowledge passed down through generations, reading the water and the weather like a living newspaper. By regulating catch sizes and seasons, the SMMA ensures that today's catch does not steal from tomorrow's dinner table."
  },
  {
    id: 6,
    question: "What kind of recreation is permitted in the Recreational Areas?",
    answer: "Snorkeling, diving, swimming, and other non-extractive tourist activities are allowed.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "Picture yourself floating in bathwater-warm Caribbean seas with a rainbow of reef fish circling beneath your fins — that is a regular Tuesday in the SMMA Recreational Areas. These zones are designed so that visitors can soak in the magic of the reef without leaving so much as a footprint on the sand."
  },
  {
    id: 7,
    question: "Are yachts allowed to anchor anywhere in the SMMA?",
    answer: "No; yachts must use designated Yacht Mooring Areas to prevent anchor damage to the seabed and corals.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "A single dropped anchor can destroy decades of coral growth in seconds — that is why mooring buoys are a reef's best friend. By snapping your line to a buoy instead of dropping anchor, you become a silent guardian of the very reef you came to admire."
  },
  {
    id: 8,
    question: "What type of coral reefs are found around Soufrière?",
    answer: "Primarily fringing reefs that grow close to the shore, typical of volcanic Caribbean islands.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Fringing reefs are like nature's moat — they hug the coastline so closely that you can practically snorkel out from the beach and be surrounded by coral within minutes. Born from volcanic rock, these reefs have been building themselves, layer by tiny layer, for thousands of years right at the island's doorstep."
  },
  {
    id: 9,
    question: "Name two common hard coral genera likely present in SMMA reefs.",
    answer: "Orbicella (e.g., mountainous star coral) and Porites (e.g., finger coral).",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Mountainous star coral builds massive dome-shaped colonies that can be taller than a scuba diver — imagine coming face-to-face with a living structure that has been growing since before the pyramids were built. Finger coral, on the other hand, stretches out delicate branches like an underwater candelabra swaying in the current."
  },
  {
    id: 10,
    question: "Is elkhorn coral (Acropora palmata) likely to be found in SMMA?",
    answer: "Yes, it is a characteristic Caribbean reef-building coral and likely occurs, though its abundance may have been reduced by disease and bleaching.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Elkhorn coral was once so abundant it literally shaped entire Caribbean reef crests, forming vast underwater forests of calcified antlers. Tragically, disease and warming seas have reduced it to a fraction of its former glory, but every surviving colony is a resilient survivor fighting to rebuild its ancient kingdom."
  },
  {
    id: 11,
    question: "Which soft coral (gorgonian) genus is frequently seen on Saint Lucia reefs?",
    answer: "Gorgonia (sea fans) and Pseudopterogorgia (sea blades) are common.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Sea fans are the underwater equivalent of fine lace — their intricate purple and yellow nets filter plankton from the passing current while swaying in hypnotic slow motion. On a night dive, these gorgonians seem to glow with an almost otherworldly elegance as your dive light catches their gossamer edges."
  },
  {
    id: 12,
    question: "What role do sponges play in the SMMA reef ecosystem?",
    answer: "Sponges filter water, provide habitat for small invertebrates, and contribute to reef structural complexity.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "A single giant barrel sponge can filter thousands of litres of seawater every single day, acting as a living water purification plant on the reef. Peer inside one on a dive and you might spot tiny shrimp, brittle stars, and juvenile fish all making a home in its porous cathedral of flesh."
  },
  {
    id: 13,
    question: "Name a common reef-associated sponge species in the Caribbean.",
    answer: "Xestospongia muta (giant barrel sponge).",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "The giant barrel sponge can live for hundreds — possibly even thousands — of years, making it one of the longest-lived animals on the reef. Some specimens grow large enough to climb inside, and divers occasionally nickname them 'the garbage disposals of the sea' for the staggering volume of water they process."
  },
  {
    id: 14,
    question: "Which sea turtle species might be observed nesting on beaches near SMMA?",
    answer: "Hawksbill (Eretmochelys imbricata) and leatherback (Dermochelys coriacea) turtles nest on Saint Lucia beaches.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Leatherback turtles are living dinosaurs — they have been swimming the oceans for over 100 million years, outlasting the actual dinosaurs. On Saint Lucia's beaches, mother turtles drag themselves ashore under moonlight to lay their eggs, and if you are extremely lucky, you might witness this ancient ritual from the surf line."
  },
  {
    id: 15,
    question: "Are queen conch (Lobatus gigas) present in SMMA waters?",
    answer: "Yes, queen conch inhabit seagrass beds and sandy areas within the SMMA and are protected under fisheries regulations.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Queen conch are the glamour models of the seagrass beds — their gorgeous pink-lipped shells are so iconic that they appear on coins and stamps across the Caribbean. Spotting one gliding slowly across the sand is like watching a tiny, shelled royalty surveying its kingdom."
  },
  {
    id: 16,
    question: "What is the most abundant herbivorous fish on SMMA reefs?",
    answer: "Parrotfish (family Scaridae), which graze on algae and help prevent algal overgrowth of corals.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Parrotfish are the reef's tireless gardeners, spending up to 90% of their waking hours nibbling algae off coral rocks with beaks strong enough to crunch through solid limestone. Without these industrious fish, algae would choke the reef within years — and their sandy poop is literally what forms those gorgeous white Caribbean beaches."
  },
  {
    id: 17,
    question: "Which parrotfish species is known for its bright terminal phase colors?",
    answer: "Stoplight parrotfish (Sparisoma viride).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "The male stoplight parrotfish in its terminal phase is draped in electric green, hot pink, and blazing blue — it looks like a tropical artist went absolutely wild with the palette. Even more astonishing, this flamboyant male started life as a more modestly coloured female before switching sex in a spectacular biological transformation."
  },
  {
    id: 18,
    question: "Name a common predator fish found patrolling SMMA reefs.",
    answer: "Nassau grouper (Epinephelus striatus), though it is overfished; other groupers like the black grouper (Mycteroperca bonaci) are present.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Nassau grouper are master shapeshifters — they can change colour in milliseconds, cycling through five or six dramatic patterns to communicate mood and intent. Sadly, this once-abundant apex predator is now endangered, making every sighting on the SMMA reef a truly precious encounter."
  },
  {
    id: 19,
    question: "Which nocturnal hunter is often seen hiding in reef crevices during the day?",
    answer: "Spiny lobster (Panulirus argus).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Spiny lobsters have no claws at all — instead they defend themselves with sharp, venomous spines and a powerful tail that can launch them backward through the water at surprising speed. At night these sluggish daytime hiders transform into bold, wandering predators, marching across the reef in surprising single-file caravans."
  },
  {
    id: 20,
    question: "What is the primary diet of the butterflyfish commonly seen in SMMA?",
    answer: "Coral polyps, small invertebrates, and zooplankton.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Butterflyfish have tiny, forceps-like mouths perfectly designed to pluck individual coral polyps from their stony homes — they are the dainty sushi chefs of the reef. Watch one feed and you will see it hover with surgical precision, nibbling polyps one by one like a jeweller examining gems."
  },
  {
    id: 21,
    question: "Which butterflyfish species is easily recognized by its black vertical bar through the eye?",
    answer: "Foureye butterflyfish (Chaetodon capistratus).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "That bold black eye bar is not just decoration — it is an evolutionary camouflage trick that hides the real eye, confusing predators into attacking the wrong end. The large false eyespot near the tail sends would-be attackers lunging at empty water while the butterflyfish darts away in the opposite direction."
  },
  {
    id: 22,
    question: "Are moray eels present in SMMA reefs?",
    answer: "Yes, species such as the green moray (Gymnothorax funebris) and spotted moray (Gymnothorax moringa) inhabit the reefs.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Green moray eels are not actually green at all — their skin is brown, but a thick layer of yellow mucus gives them that striking jade hue when you see them underwater. Peer into a reef crevice and watch those jaws rhythmically open and close; they are not threatening you, they are simply breathing, but it still sends a shiver down your spine."
  },
  {
    id: 23,
    question: "What symbiotic relationship do clownfish have, and are they found in SMMA?",
    answer: "Clownfish live mutually with sea anemones; however, true clownfish (Amphiprioninae) are not native to the Atlantic, so they are not found in SMMA.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "While you will not find Nemo in Soufrière, the Atlantic has its own version of this partnership —nantasi shrimp and other creatures form close bonds with anemones here too. The Caribbean anemones themselves are spectacular enough, with trailing tentacles that wave like alien fingers in the current."
  },
  {
    id: 24,
    question: "Which damselfish species is territorial and farms algae on coral heads?",
    answer: "Beaugregory (Stegastes leucostictus).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Beaugregory are the feisty little farmers of the reef, aggressively defending their tiny algae patches from fish many times their size — even from divers who get too close. They cultivate their algae with surprising diligence, weeding out unwanted species and chasing away any intruder bold enough to trespass on their turf."
  },
  {
    id: 25,
    question: "Name a common snapper species targeted by fishers in the SMMA.",
    answer: "Yellowtail snapper (Ocyurus chrysurus).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Yellowtail snapper are the supermodels of the snapper family — sleek silver bodies accented by a dazzling golden tail streak that catches the light as they cruise the reef edges. They often gather in shimmering schools at dusk, creating a swirling silver spectacle that divers consider one of the reef's most magical evening shows."
  },
  {
    id: 26,
    question: "Which fish is known for its ability to change sex from female to male?",
    answer: "Many parrotfish and groupers are protogynous hermaphrodites (e.g., stoplight parrotfish, Nassau grouper).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "In the reef world, gender is not written in stone — when the dominant male disappears, the largest female in the group can literally transform into a male over just a few weeks. This incredible biological flexibility ensures that reef fish populations always have breeding males, no matter what challenges nature throws at them."
  },
  {
    id: 27,
    question: "What is the significance of the long-spined sea urchin (Diadema antillarum) to reef health?",
    answer: "It is a key grazer that controls algae; its die-off in the 1980s contributed to algal overgrowth on many Caribbean reefs.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "In 1983, a mysterious disease wiped out 95% of Caribbean Diadema overnight, and reefs have been struggling with algae ever since — it was an underwater catastrophe of epic proportions. These spiny grazers are slowly recovering, and every urchin you see on the SMMA reef is a tiny soldier in the ongoing battle against algal takeover."
  },
  {
    id: 28,
    question: "Are long-spined sea urchins present in SMMA?",
    answer: "Populations have been recovering but remain variable; they are present in modest numbers.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Spotting a cluster of Diadema on the reef is like finding a group of tiny, spiny hedgehogs grazing the rocks — each one is slowly but surely clearing space for new coral recruits. Their gradual comeback is one of the most hopeful signs of reef recovery that divers in Soufrière can witness firsthand."
  },
  {
    id: 29,
    question: "Which marine mammal might occasionally be seen off the SMMA coast?",
    answer: "Bottlenose dolphin (Tursiops truncatus) and, less frequently, pantropical spotted dolphin (Stenella attenuata).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Bottlenose dolphins are notorious for surfing the bow waves of boats entering Soufrière harbour — their playful acrobatics are the stuff of legend among local sailors. If you are very fortunate, you might hear their clicks and whistles through your dive regulator as a pod passes overhead while you are exploring the reef below."
  },
  {
    id: 30,
    question: "Are there any shark species regularly observed in SMMA waters?",
    answer: "Reef sharks such as the Caribbean reef shark (Carcharhinus perezi) and nurse shark (Ginglymostoma cirratum) may be sighted, though encounters are rare.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Nurse sharks are the couch potatoes of the shark world — they spend most of the day lying motionless on the sandy bottom, looking like grumpy grey mattresses. But at night they transform into active hunters, using suction to inhale crustaceans and small fish from crevices with startling power."
  },
  {
    id: 31,
    question: "What type of seabed habitat supports seagrass beds in SMMA?",
    answer: "Sandy and muddy substrates in shallow, protected bays and lagoons.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Seagrass meadows are the unsung heroes of the marine world — they stabilise the seabed with their tangled root networks like underwater Velcro, preventing erosion and keeping the water clear. Floating above a dense seagrass bed is like hovering over an emerald prairie, with juvenile fish darting between the blades like tiny silver rabbits."
  },
  {
    id: 32,
    question: "Which two seagrass species are typical in Saint Lucia?",
    answer: "Turtle grass (Thalassia testudinum) and manatee grass (Syringodium filiforme).",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Turtle grass has flat, ribbon-like blades that create dense underwater meadows — and it is named after the very turtles that graze on it. Manatee grass, with its round, spaghetti-like leaves, often grows alongside it, creating a rich tapestry of textures that supports an incredible diversity of marine life."
  },
  {
    id: 33,
    question: "What role do seagrass beds play for juvenile fish?",
    answer: "They provide nursery grounds, shelter, and feeding areas for many reef fish species.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Think of seagrass beds as the kindergarten of the ocean — baby fish hide among the blades to escape predators while they grow strong enough to venture onto the open reef. Studies show that up to 80% of commercially important Caribbean fish species spend at least part of their life cycle in these underwater nurseries."
  },
  {
    id: 34,
    question: "Name a fish that relies on seagrass nurseries as a juvenile.",
    answer: "Gray snapper (Lutjanus griseus).",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Gray snapper start life as tiny, nearly invisible fry drifting in the calm waters of seagrass beds before gradually growing into the reef predators that divers recognize. This means that the seagrass meadows you snorkel over on your way to the reef are literally raising the next generation of reef fish."
  },
  {
    id: 35,
    question: "Which invertebrate is commonly harvested from seagrass beds for local consumption?",
    answer: "Queen conch.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Queen conch is the national treasure of Caribbean cuisine — from conch fritters to conch salad, this humble snail has been feeding island communities for thousands of years. Finding one in the seagrass is like discovering a beautiful spiralled jewel half-buried in the sand, its pink shell gleaming in the dappled sunlight."
  },
  {
    id: 36,
    question: "What is the main threat to coral reefs in SMMA from climate change?",
    answer: "Elevated sea surface temperatures leading to coral bleaching and increased disease susceptibility.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Corals can survive in a narrow temperature range just slightly cooler than your body temperature — even one or two degrees above their comfort zone triggers a catastrophic stress response. When that happens, corals bleach to ghostly white as they expel the very algae that give them life, like a tree dropping all its leaves in a heatwave."
  },
  {
    id: 37,
    question: "How do hurricanes affect SMMA reefs?",
    answer: "Strong waves can break coral colonies, cause sediment smothering, and temporarily reduce fish abundance.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "A Category 5 hurricane can generate waves powerful enough to flip massive coral boulders that weigh several tonnes — imagine the sheer underwater violence. But Caribbean reefs evolved with hurricanes, and they have remarkable resilience; given time and protection, broken fragments can actually reattach and regrow into new colonies."
  },
  {
    id: 38,
    question: "What management measure helps reefs recover after a hurricane?",
    answer: "Establishing Marine Reserves where fishing is banned enhances resilience and speeds recovery.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Marine Reserves act like underwater intensive care units after a storm — with no fishing pressure, fish populations bounce back quickly, and healthier fish populations actually help reef recovery by grazing the algae that would otherwise smother damaged corals. It is a beautiful example of nature healing itself when given the chance."
  },
  {
    id: 39,
    question: "Are there any invasive species of concern in SMMA?",
    answer: "The lionfish (Pterois volitans) is an invasive predator that has spread throughout the Caribbean, including Saint Lucia waters.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Lionfish are the beautiful villains of the Caribbean — with their ornate, fan-like fins and striped bodies, they look like living works of art, but they are decimating native fish populations. A single female can release two million eggs per year, and they have zero natural predators in Atlantic waters, making them an ecological nightmare."
  },
  {
    id: 40,
    question: "What impact does lionfish have on native reef fish?",
    answer: "Lionfish voraciously consume small reef fish and juveniles, reducing biodiversity and altering food webs.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Lionfish are ambush predators that can swallow fish up to half their own body size in a single gulp — their expandable stomachs are like bottomless pits. On reefs where lionfish are abundant, native fish populations can drop by up to 79% in just five weeks, turning vibrant, bustling reefs into eerily quiet seascape."
  },
  {
    id: 41,
    question: "How does the SMMA address the lionfish threat?",
    answer: "Through culling programs, promoting lionfish as a food fish, and educating divers and fishers to report and remove lionfish.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Dive teams in Soufrière now regularly go on 'lionfish hunts' armed with pole spears and containment buckets — it is conservation action at its most hands-on. And the delicious twist? Lionfish flesh is flaky, mild, and perfectly safe to eat once the venomous spines are removed, turning an ecological threat into a gourmet opportunity."
  },
  {
    id: 42,
    question: "Which coral disease has affected Saint Lucia reefs in recent years?",
    answer: "Stony coral tissue loss disease (SCTLD) has been reported in the Caribbean and poses a risk to SMMA reefs.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "SCTLD is like a slow-motion plague — it spreads silently through coral colonies, leaving behind stark white patches of skeleton where vibrant tissue once lived. First detected near Florida in 2014, it has now marched across the entire Caribbean, making it one of the most devastating coral diseases ever recorded."
  },
  {
    id: 43,
    question: "What is a sign of healthy coral recruitment in SMMA?",
    answer: "Presence of small coral colonies (recruits) on reef substrates, indicating successful larval settlement.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Coral recruits are so tiny they look like colorful sequins scattered on the rock — often no bigger than a fingernail, yet they represent the reef's future. Spotting them through a dive mask is like finding baby stars being born on the ocean floor, each one carrying the potential to grow into a massive colony that will shelter marine life for centuries."
  },
  {
    id: 44,
    question: "Which month typically marks the start of the hurricane season affecting SMMA?",
    answer: "June.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "June through November is when the Caribbean holds its collective breath — warm ocean waters act as fuel for these massive storms, and Soufrière's reefs are right in the potential path. The silver lining? The seasonal mixing of waters brings nutrient pulses that can actually boost reef productivity between storms."
  },
  {
    id: 45,
    question: "What water temperature range is optimal for coral growth in SMMA?",
    answer: "Approximately 24°C – 29°C (75°F – 84°F).",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Corals are incredibly picky about temperature — they thrive in a window narrower than what most humans set their home thermostats to. That 24-29°C range is the Goldilocks zone where the zooxanthellae algae inside coral tissues can photosynthesize efficiently, pumping energy into their hosts like tiny solar-powered batteries."
  },
  {
    id: 46,
    question: "How does nutrient runoff from land affect SMMA reefs?",
    answer: "Excess nutrients can promote algal blooms that smother corals and reduce water clarity.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "When too much fertilizer, sewage, or sediment washes into the ocean, it is like dumping a massive bag of plant food on the reef — algae explode into uncontrollable growth and literally suffocate the corals underneath. This is why the health of SMMA reefs is intimately connected to what happens on land, sometimes kilometres from the shore."
  },
  {
    id: 47,
    question: "What protective vegetation helps reduce runoff into SMMA waters?",
    answer: "Mangrove forests and riparian vegetation along rivers and gullies.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Mangroves are nature's water filters — their dense, tangled root systems trap sediment and pollutants before they can reach the reef, acting like a living barrier between land and sea. Standing in a mangrove forest, you are literally surrounded by roots that are simultaneously filtering water, anchoring coastline, and raising baby fish."
  },
  {
    id: 48,
    question: "Are there mangroves within the SMMA boundaries?",
    answer: "Limited mangrove patches occur in sheltered bays and estuaries adjacent to the SMMA, contributing to nursery habitats.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Even small patches of mangroves punch well above their weight in ecological value — a single hectare of mangrove can support over 100 species of fish and invertebrates. When you kayak through Soufrière's sheltered bays, you are paddling through a critical nursery that connects the forest to the reef in one continuous chain of life."
  },
  {
    id: 49,
    question: "Which fish species is known for its bright blue color and is a popular sight for divers?",
    answer: "Queen angelfish (Holacanthus ciliaris).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "The queen angelfish is so vividly blue and gold that it looks like it was painted by a Caribbean artist with a very generous budget for pigment. It wears a dark blue ring around each eye like royal eyeliner, and spotting one gliding regally over the reef is guaranteed to make even the most experienced diver gasp with delight."
  },
  {
    id: 50,
    question: "What distinguishes the French angelfish from the queen angelfish?",
    answer: "French angelfish (Pomacanthus paru) has a yellow mouth and lacks the queen's blue crown-like marking on the forehead.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "French angelfish are the romantic power couples of the reef — they often pair for life and cruise together through the coral gardens in synchronized harmony. Their dark, scaled bodies edged with bright yellow tips give them a striking appearance that contrasts beautifully with the brilliant blue of their queen angelfish cousins."
  },
  {
    id: 51,
    question: "Name a nocturnal feeder that hides under ledges during the day.",
    answer: "Squirrelfish (family Holocentridae), e.g., longspine squirrelfish (Holocentrus rufus).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Squirrelfish have enormous, dark eyes that glow like red headlights when your dive beam catches them — they are built for seeing in near-total darkness. During the day they huddle under ledges in nervous, blinking clusters, but once night falls they fan out across the reef on solo hunting missions with surprising confidence."
  },
  {
    id: 52,
    question: "What is the primary diet of the squirrelfish?",
    answer: "Small crustaceans, mollusks, and zooplankton taken at night.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "On a night dive in Soufrière, you can watch squirrelfish emerge from their daytime hideouts like tiny, red-masked ninjas on a secret mission. Their oversized eyes and lateral line system make them supremely effective hunters in the dark, snapping up shrimp and plankton invisible to the naked human eye."
  },
  {
    id: 53,
    question: "Which echinoderm is known for its ability to eject its internal organs as a defense?",
    answer: "Sea cucumbers (class Holothuroidea).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Sea cucumbers can literally shoot out their own guts — sticky, tangled threads called Cuvierian tubules that entangle and confuse predators like a biological sticky bomb. The incredible part? They regenerate those ejected organs within just a few weeks, making them one of nature's most extreme survivors."
  },
  {
    id: 54,
    question: "Are sea cucumbers harvested in SMMA?",
    answer: "Some species are collected locally for food, but harvesting is regulated to prevent overexploitation.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "In many Asian cuisines, sea cucumber is considered a luxury delicacy worth more per kilogram than gold in some markets. This global demand puts enormous pressure on Caribbean populations, which is why the SMMA's harvesting regulations are so crucial — these humble bottom-dwellers are vital for recycling nutrients in reef sediment."
  },
  {
    id: 55,
    question: "What is the common name for Stenopus hispidus found in SMMA crevices?",
    answer: "Banded coral shrimp.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Banded coral shrimp are the rocks stars of the reef crevice world — with their candy-cane red and white stripes and long, waving antennae, they are impossible to miss. They are also diligent cleaners, setting up shop in cave entrances where larger fish queue up patiently to have parasites picked from their gills and skin."
  },
  {
    id: 56,
    question: "Which cleaning organism sets up stations where fish visit to have parasites removed?",
    answer: "Cleaner gobies (Elacatinus spp.) and cleaner shrimp (Lysmata amboinensis).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Cleaning stations are like underwater car washes where big predatory fish patiently wait in line for a tiny goby to nibble parasites off their bodies — the predator does not eat the cleaner, and that trust is one of the most remarkable things in marine biology. These stations are so important that reef diversity drops measurably when cleaner species are removed."
  },
  {
    id: 57,
    question: "What benefit do fish gain from visiting cleaning stations?",
    answer: "Removal of ectoparasites and diseased tissue, improving health and reducing stress.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Watch a grouper visit a cleaning station and you will see it adopt a specific 'I am here for cleaning' posture — mouth open, gills flared, body motionless — a universal signal that says 'help, do not eat me'. The tiny cleaner fish then swim fearlessly inside the predator's mouth and across its gills, performing a dental-exam-level cleaning in the open ocean."
  },
  {
    id: 58,
    question: "Which planktonic organism is responsible for the occasional bioluminescence seen in SMMA waters at night?",
    answer: "Dinoflagellates (e.g., Noctiluca scintillans).",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Swimming through bioluminescent water in Soufrière at night is like gliding through liquid starlight — every movement of your fins triggers a flash of electric blue light. These microscopic dinoflagellates flash when disturbed as a defense mechanism, turning the entire ocean into a living, breathing light show that photographs simply cannot capture."
  },
  {
    id: 59,
    question: "What time of year is generally best for diving visibility in SMMA?",
    answer: "The dry season from December to June typically offers calmer seas and better visibility.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "During the dry season, visibility in Soufrière can exceed 30 metres — that is deep enough to see the massive coral formations of the Pitons rising from the abyss like underwater mountains. The calm, clear conditions of these months are when the SMMA truly shows off its underwater splendour at its most breathtaking."
  },
  {
    id: 60,
    question: "How deep do the coral reefs of SMMA typically extend?",
    answer: "Most reef development occurs from the shoreline down to about 20-30m (60-100ft); deeper zones support fewer light-dependent corals.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "At 30 metres deep, you are in the twilight zone where light dims to a blue haze and the reef takes on an ethereal, dreamlike quality. Beyond this depth, only the most adaptable corals survive, clinging to rock faces like tenacious survivors on the frontier of a light-limited world."
  },
  {
    id: 61,
    question: "What type of coral forms the structural foundation of most SMMA reefs?",
    answer: "Reef-building (hermatypic) corals that host symbiotic zooxanthellae algae.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Hermatypic corals are living partnerships — each tiny polyp hosts millions of zooxanthellae algae inside its tissues that photosynthesize and feed the coral in exchange for shelter. This symbiosis is so efficient that reef-building corals can construct massive limestone structures visible from space, all powered by sunlight and microscopic algae."
  },
  {
    id: 62,
    question: "Name a non-reef-building coral that may be found in SMMA.",
    answer: "Solitary corals such as Mycetophyllia spp. or soft corals like sea whips.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Non-reef-building corals do not get the fame of their reef-building cousins, but they are equally fascinating — brain corals and sea whips add texture and diversity that make the reef feel like a true underwater city. Sea whips sway in the current like underwater flagpoles, marking territories and providing perches for cleaner shrimp and small fish."
  },
  {
    id: 63,
    question: "Which fish is known for producing a grunting sound by grinding its teeth?",
    answer: "White grunt (Haemulon plumierii).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "If you have ever heard mysterious grunting or knocking sounds while diving, chances are you were near a school of white grunts — they grind their pharyngeal teeth to produce audible croaks that carry through the water. Divers often mistake these sounds for boat engines or snapping shrimp, but it is actually just fish having very noisy conversations."
  },
  {
    id: 64,
    question: "Are there any endemic fish species unique to Saint Lucia's waters?",
    answer: "No strictly endemic marine fish are known; most species are widespread throughout the Caribbean.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "The Caribbean Sea functions as one giant, interconnected underwater highway — fish larvae drift on currents between islands, keeping populations genetically linked across hundreds of kilometres. This connectivity is why protecting one reef like the SMMA benefits the entire Caribbean, as healthy fish populations from Soufrière can repopulate stressed reefs elsewhere."
  },
  {
    id: 65,
    question: "What conservation status does the Nassau grouper hold regionally?",
    answer: "It is listed as Endangered on the IUCN Red List due to overfishing.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Nassau grouper populations have crashed by more than 80% since the 1980s — they are one of the most dramatically declined large reef fish in the Western Hemisphere. These majestic fish once gathered in groups of thousands during spawning season, a spectacle described as one of the great marine migrations of the Caribbean."
  },
  {
    id: 66,
    question: "Does the SMMA have any specific protections for Nassau grouper?",
    answer: "Yes, fishing for Nassau grouper is prohibited or heavily restricted within Marine Reserves and may have seasonal closures elsewhere.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "The SMMA's seasonal fishing closures during Nassau grouper spawning periods are critical — these fish are creatures of habit, returning to the exact same reef sites year after year to breed, making them tragically easy targets. Protecting them during spawning is like guarding the front door of their nursery while the next generation is conceived."
  },
  {
    id: 67,
    question: "Which mollusk is known for producing pearls and is found in SMMA?",
    answer: "The pearl oyster (Pinctada imbricata) occurs, though pearl formation is rare.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Pearl formation is nature's accident — a tiny irritant lodges inside the oyster, and in self-defense it coats the intruder layer by layer with shimmering nacre until a gem is born. Finding a natural pearl in a Caribbean oyster is rarer than finding a diamond on the beach, which makes any discovery of one absolutely extraordinary."
  },
  {
    id: 68,
    question: "What is the maximum size of the queen conch shell?",
    answer: "Up to 30cm (12in) in length.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "A full-grown queen conch shell is big enough to blow like a trumpet — and in fact, it has been used as a ceremonial horn across the Caribbean for centuries. The interior of the shell reveals a stunning, glossy pink surface that Polynesian and Caribbean cultures have treasured as jewelry and art for millennia."
  },
  {
    id: 69,
    question: "How do conch reproduce?",
    answer: "They engage in internal fertilization; females lay egg masses in sandy substrates that hatch into planktonic larvae.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Queen conch mating is surprisingly theatrical — males and females engage in elaborate 'love dances' on the seafloor, circling each other for hours before finally coupling. The females then deposit massive pink egg masses on the sand that can contain up to half a million eggs, each one a potential future queen of the seagrass beds."
  },
  {
    id: 70,
    question: "Which bird species is often seen diving for fish near SMMA shores?",
    answer: "Brown pelican (Pelecanus occidentalis) and various terns (e.g., royal tern Thalasseus maximus).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Brown pelicans are spectacular to watch — they fly low over the water in formation before folding their wings and plunging beak-first into the sea like feathered missiles. Their throat pouches can hold up to 11 litres of water, which they drain to trap fish, making them one of the most efficient avian fishermen in the Caribbean."
  },
  {
    id: 71,
    question: "Are there any underwater archaeological sites within SMMA?",
    answer: "While not widely documented, historic anchors and possible shipwreck remnants may exist, given the area's maritime history.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "The waters off Soufrière have been sailed by Carib Indians, Spanish conquistadors, British naval fleets, and pirate ships for centuries — every one of those voyages potentially left traces on the seafloor. Exploring SMMA dive sites with an archaeological mindset adds a thrill of discovery to every dive, as you never know when encrusted anchor or cannon might appear from the blue."
  },
  {
    id: 72,
    question: "What is the purpose of the SMMA's monitoring and research program?",
    answer: "To assess coral cover, fish abundance, water quality, and the effectiveness of management zones over time.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "SMMA researchers conduct underwater surveys using permanent transect lines they swim along with measuring tapes and data slates — it is painstaking, fin-kicking scientific work. This data is the vital heartbeat monitor of the reef, telling managers exactly when the ecosystem is thriving and when it needs urgent intervention."
  },
  {
    id: 73,
    question: "How can tourists contribute to SMMA conservation?",
    answer: "By practicing responsible diving (no touching anchors or corals), using reef-safe sunscreen, supporting local eco-friendly operators, and participating in citizen-science reporting.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "Even the sunscreen you apply before a dive matters — chemicals like oxybenzone can bleach coral at concentrations as low as one drop in a swimming pool. Choosing reef-safe sunscreen is one of the simplest, most powerful things any diver can do, and many Soufrière dive shops now stock mineral-based alternatives that protect both your skin and the reef."
  },
  {
    id: 74,
    question: "What is a reef-safe sunscreen ingredient to avoid?",
    answer: "Oxybenzone and octinoxate, which can cause coral bleaching and DNA damage.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Oxybenzone does not just harm corals — it can accumulate in the tissues of fish, sea turtles, and even whales, disrupting hormones across entire marine food webs. Several Caribbean islands have now banned these chemicals outright, recognising that what we put on our skin literally ends up in the ocean and in the bodies of the creatures we came to admire."
  },
  {
    id: 75,
    question: "Which organization manages the SMMA on a day-to-day basis?",
    answer: "The Soufrière Marine Management Association Inc. (SMMA), a non-governmental organization authorized by the Government of Saint Lucia.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "The SMMA is one of the most successful community-managed marine areas in the entire Caribbean — it was created by the very fishing and tourism communities that depend on the reef, giving it deep local roots. This grassroots approach means the people protecting the reef are the same ones whose livelihoods depend on its health, creating powerful incentives for real conservation."
  },
  {
    id: 76,
    question: "How is the SMMA funded?",
    answer: "Through user fees (diving, yacht moorings), grants, donations, and government support.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Every time a diver pays a marine park fee or a yacht ties up to a mooring buoy, they are directly funding the rangers, researchers, and patrols that keep the reef healthy. This user-fee model is a brilliant example of how tourism can actively finance conservation rather than just extracting beauty from it."
  },
  {
    id: 77,
    question: "What is the significance of the Pitons for the SMMA's underwater environment?",
    answer: "The Pitons create a sheltered leeward coast that reduces wave energy, favoring coral growth and providing scenic backdrop for marine tourism.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "The Pitons are UNESCO World Heritage Sites above water, but beneath the surface they are equally spectacular — their submerged flanks drop to over 100 metres, covered in pristine coral gardens that rank among the healthiest in the Caribbean. The volcanic rock of these twin peaks creates perfect substrate for coral attachment, and the sheltered waters they create are like a natural greenhouse for reef growth."
  },
  {
    id: 78,
    question: "Does sedimentation from the Pitons' slopes affect SMMA reefs?",
    answer: "Minor sediment runoff can occur during heavy rains, but vegetative cover generally limits major impacts.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "After heavy tropical rains, you can sometimes see plumes of sediment flowing down the Pitons' slopes like underwater rivers — but the lush tropical forest covering these mountains acts as a giant sponge, absorbing and filtering most of the water before it reaches the reef. This is why protecting the forests above is just as important as protecting the corals below."
  },
  {
    id: 79,
    question: "Which photosynthetic organism lives inside coral tissues and provides them with energy?",
    answer: "Zooxanthellae (symbiotic dinoflagellates).",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "Each coral polyp is essentially a tiny, transparent sun-powered apartment building — thousands of zooxanthellae living inside its transparent tissue convert sunlight into sugars that feed the coral, providing up to 90% of its energy needs. This partnership is so ancient and intimate that corals literally cannot survive without their algae tenants."
  },
  {
    id: 80,
    question: "What happens during a coral bleaching event?",
    answer: "Corals expel their zooxanthellae due to stress (often heat), lose color, and may die if the stress persists.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "When water gets too warm, the zooxanthellae inside coral tissues start producing toxic chemicals instead of food — the coral's only defense is to evict these tenants, leaving behind a stark white skeleton of empty tissue. It is like watching a vibrant city suddenly lose all its power plants in a single night, and if the algae do not return within weeks, the coral starves."
  },
  {
    id: 81,
    question: "Have SMMA reefs experienced significant bleaching in recent years?",
    answer: "Bleaching events have been reported across the Caribbean, including Saint Lucia, particularly during warm years like 2010 and 2023-2024.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "The 2023-2024 global bleaching event was the worst ever recorded, with ocean temperatures shattering records across the Caribbean — entire reef systems that had survived centuries turned ghostly white in a matter of weeks. For the SMMA, these events are an urgent warning: without rapid climate action, even the best-managed reefs cannot survive waters that stay too hot for too long."
  },
  {
    id: 82,
    question: "What restoration technique is being trialed to help coral recovery in SMMA?",
    answer: "Coral gardening — fragmenting resilient corals, growing them in nurseries, and outplanting onto degraded reef areas.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Coral gardening is like underwater tree farming — divers carefully snip small fragments from healthy parent corals and suspend them on underwater 'trees' where they grow in the water column, safe from sediment and predators. After months of tender care, these nursery-grown fragments are then cemented onto damaged reef, where they grow and spread to rebuild what bleaching and storms have destroyed."
  },
  {
    id: 83,
    question: "Which fish species is known to sleep in a mucus cocoon at night?",
    answer: "Parrotfish secrete a mucous blanket that may deter parasites and predators.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Every night, parrotfish blow themselves a snot bubble — a transparent mucus envelope that completely covers their body like an invisible sleeping bag. Scientists believe this cocoon masks their scent from nocturnal predators like moray eels, essentially turning the parrotfish into an invisible, scent-free sleeping beauty until dawn."
  },
  {
    id: 84,
    question: "Are there any freshwater inputs that influence SMMA salinity?",
    answer: "Small rivers and streams (e.g., Soufrière River) discharge near the coast, creating localized salinity reductions after heavy rain.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "After a big tropical downpour, the Soufrière River creates a visible freshwater plume extending into the sea — snorkellers can actually feel the layer of lighter freshwater sitting on top of the denser salt water. This mixing zone creates a unique microhabitat where freshwater and marine species briefly overlap, adding surprising biodiversity to the nearshore environment."
  },
  {
    id: 85,
    question: "What is the typical salinity of SMMA seawater?",
    answer: "Around 35 parts per thousand (ppt), typical of open Caribbean waters.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "That 35 parts per thousand salinity means that for every litre of SMMA seawater, roughly 35 grams of dissolved salt is floating invisibly around you — and that salt is what makes the Caribbean's characteristic buoyancy so perfect for effortless floating. Marine organisms here have evolved over millions of years to thrive in precisely this saltiness, and even small changes can stress sensitive corals."
  },
  {
    id: 86,
    question: "Which planktonic crustacean is a key food source for many reef fish larvae?",
    answer: "Copepods (e.g., Acartia spp.).",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "Copepods are the most abundant animals on Earth by biomass — trillions of these microscopic crustaceans form the invisible foundation of the entire marine food web. For a newly hatched reef fish larva, finding a copepod is like finding a life-saving meal floating in an enormous blue void, and the survival of entire fish populations depends on there being enough of these tiny creatures in the plankton."
  },
  {
    id: 87,
    question: "Name a nocturnal predator that hunts over the reef flat at night.",
    answer: "The spotted eel (Myrichthys breviceps) or various octopus species.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Spotted eels are surprisingly beautiful nocturnal hunters — unlike their moray cousins, they actively cruise over open reef flats rather than lurking in holes, their spotted bodies winding gracefully over coral heads. On a night dive, seeing one emerge from the darkness is like watching a living, sinuous river of spots flowing across the sleeping reef."
  },
  {
    id: 88,
    question: "How do octopuses contribute to reef ecology?",
    answer: "As intelligent predators, they help control populations of crustaceans and mollusks.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Octopuses have been observed using coconut shells as portable shelters — carrying halves across the seafloor and assembling them into armor when threatened, which is essentially tool use by an invertebrate. On the SMMA reef, these boneless geniuses are formidable predators of crabs and clams, using venomous saliva and problem-solving skills to crack open meals that baffles scientists."
  },
  {
    id: 89,
    question: "Are there any species of seahorses found in SMMA seagrass beds?",
    answer: "The lined seahorse (Hippocampus erectus) may occur in seagrass and mangrove fringes.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Finding a seahorse in the seagrass is one of the most magical moments in Caribbean diving — they are so perfectly camouflaged that even experienced divemasters often miss them entirely. Lined seahorses grip seagrass blades with their prehensile tails, swaying gently in the current like tiny, armored knights standing guard over their emerald kingdom."
  },
  {
    id: 90,
    question: "What is the male seahorse's unique reproductive role?",
    answer: "Males receive eggs from females and carry them in a brood pouch until they hatch.",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Seahorses are one of the only animals on Earth where dad gets pregnant — the female deposits her eggs into the male's abdominal pouch, where he fertilizes and nurtures them for weeks until giving birth to hundreds of tiny, fully independent babies. This extraordinary role reversal makes seahorses one of nature's most Endearing and unusual parents."
  },
  {
    id: 91,
    question: "Which conservation measure helps protect seahorse populations?",
    answer: "Protecting seagrass habitats and regulating trade (seahorses are listed on CITES Appendix II).",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Millions of seahorses are captured globally every year for traditional medicine and the aquarium trade — CITES Appendix II listing means international trade is now strictly regulated to prevent extinction. Protecting the seagrass habitats in SMMA gives Caribbean seahorses a critical safe haven where they can live, breed, and thrive away from the pressures of global demand."
  },
  {
    id: 92,
    question: "What is the approximate coral cover percentage considered healthy for a Caribbean reef?",
    answer: "Live coral cover above 20-30% is often regarded as indicative of a relatively healthy reef system.",
    category: "Reef Life",
    icon: "\u{1f420}",
    funFact: "A reef with 30% coral cover is actually teeming with life — remember that even a small percentage of coral creates an enormously complex three-dimensional habitat supporting thousands of species. Sadly, many Caribbean reefs have dropped below 10% coral cover, making every SMMA reef section that maintains healthy cover levels a precious, hard-won victory."
  },
  {
    id: 93,
    question: "How does the SMMA's Multiple Use Area balance different activities?",
    answer: "It allows compatible uses such as limited fishing, diving, and anchorage under regulations that minimize conflict and environmental impact.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "Multiple Use Areas are the diplomatic compromise zones of marine management — here, a fisherman can set his traps while a dive boat operates nearby, all under carefully negotiated rules that keep everyone safe and the reef protected. This balanced approach is what makes the SMMA a model for marine management worldwide, proving that conservation and livelihoods can coexist."
  },
  {
    id: 94,
    question: "Are there any restrictions on collecting marine souvenirs (e.g., shells, coral) in SMMA?",
    answer: "Yes, removing live or dead coral, shells, or other marine life is generally prohibited to protect the ecosystem.",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "That pretty piece of coral you spotted on the seabed? It might look like a harmless souvenir, but dead coral still provides essential habitat for thousands of tiny organisms \u2014 removing it is like ripping bricks out of an apartment building. Soufrière's marine regulations exist to ensure that every visitor takes only photographs and leaves only bubbles."
  },
  {
    id: 95,
    question: "Which international convention guides the SMMA's efforts to prevent marine pollution from ships?",
    answer: "The International Convention for the Prevention of Pollution from Ships (MARPOL).",
    category: "Conservation",
    icon: "\u{1f6e1}\ufe0f",
    funFact: "MARPOL is the invisible shield protecting Soufrière's waters from the ships that pass through — it strictly limits everything from oil discharge to garbage dumping by vessels in Caribbean waters. Without this international agreement, the pristine reefs of the SMMA would be at constant risk from the hundreds of ships that navigate these Caribbean sea lanes every year."
  },
  {
    id: 96,
    question: "How does the SMMA contribute to fisheries sustainability outside its boundaries?",
    answer: "By acting as a source of adult fish and larvae that spill over into adjacent fishing grounds, enhancing catches for local fishers.",
    category: "Ecosystem",
    icon: "\u{1f30a}",
    funFact: "The 'spillover effect' is one of the most powerful arguments for marine protected areas — fish born inside the SMMA literally swim out into neighbouring fishing zones, boosting catches for fishers who might otherwise have opposed the reserve. Studies have shown that fish biomass within protected areas can be up to six times higher than on unprotected reefs, creating a living reservoir that feeds the surrounding ocean."
  },
  {
    id: 97,
    question: "What traditional fishing method is still used by some Soufrière fishers?",
    answer: "Hand-line fishing and fish pots (traps) are common, with some use of seines in designated areas.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "Hand-line fishing in Soufrière is a meditative art form — fishers stand on rocky outcrops or sit in small wooden boats, feeling for the faintest tug of a snapper on a single line dropped into the blue. These traditional methods are inherently sustainable: low bycatch, low habitat damage, and a deep respect for the ocean that has been passed from parent to child for generations."
  },
  {
    id: 98,
    question: "Which sea bird nests on the cliffs near the Pitons and may feed over SMMA waters?",
    answer: "The brown booby (Sula leucogaster).",
    category: "Marine Creatures",
    icon: "\u{1f422}",
    funFact: "Brown boobies are spectacular plunge-divers — they fold their wings and dive from heights of up to 30 metres, hitting the water at over 60 km/h to catch fish just below the surface. Watching them hunt over SMMA waters is like watching aerial acrobatics in real time, as they effortlessly combine grace and power in their quest for the perfect catch."
  },
  {
    id: 99,
    question: "What is the role of the SMMA's weather page for users?",
    answer: "It provides forecasts and sea conditions to help divers, fishers, and yacht operators plan safe activities.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "In the Caribbean, weather can change from glassy calm to blowing force in under an hour — the SMMA weather page is the digital lifeline that helps divers and fishers read the ocean's mood before heading out. Smart divers check it religiously, knowing that the difference between a magical 40-metre visibility day and a terrifying current-swept nightmare often comes down to wind direction and swell height."
  },
  {
    id: 100,
    question: "How can someone learn more about ongoing SMMA projects?",
    answer: "By visiting the SMMA website (smma.org.lc) or contacting their office in Soufrière for updates on research, monitoring, and community outreach.",
    category: "Diving & Tourism",
    icon: "\u{1f93f}",
    funFact: "The SMMA is constantly evolving, launching new coral restoration projects, expanding marine monitoring, and engaging local communities in reef stewardship. Following their work is like following the story of an ocean comeback in real time — every update is a chapter in one of the Caribbean's most inspiring conservation success stories."
  }
];

Medlemsregistret

Inlämningsuppgift 1 - Inlämnas via Studentportalen senast 21 maj

Din uppgift är att programmera ett medlemsregister för en klubb. Vad klubben har för
inriktning är upp till dig, om det är sport, hobby, eller något annat.

Det är alltid trevligt om registret har en trevlig design, men det är funktionaliteten som är
betygsgrundande.

Lämnas in som ZIP med alla filer i Inlämingsmappen. Om din ZIP är för stor, skippa att ta
med node_modules-mappen i din ZIP. (Tips: Om du tagit bort node_modules och därefter
vill kunna köra din applikation igen behöver du köra npm install (utan några argument)
för att bygga upp node_modules igen)

Medlemsregistret skall ha fyra sidor:

• Startsida
• Medlemslista
• Sida för att se detaljer om en enskild medlem
• Formulär för att lägga till nya medlemmar

Varje sida skall ha:

• En huvudmeny som länkar till startsidan, medlemslistan och formuläret
• En footer med kontaktinformation till klubben

Varje medlem i systemet skall ha följande information:

• Namn
• E-mail
• Telefonnummer
• Datum när de gick med
• Ett valfritt fält till som har med klubbens verksamhet att göra

Startsidan:

Information om klubbens verksamhet

Medlemslistan:

• En lista över alla medlemmar
• Listan skall innehålla medlemmens namn
• Varje medlem skall ha en länk till sidan där man kan se detaljer om medlemmen

Detaljsida:

Visa all information om medlemmen:

• Namn
• Email
• Telefonnummer
• Datum
• Valfria fältet

Det skall också finnas en knapp för att ta bort medlemmen helt ur systemet.

Formulär:
Formulär för att lägga till medlemmen, med alla fälten:

• Namn
• Email
• Telefonnummer
• Datum
• Valfria fältet

VG
För att få betyget VG ska följande funktioner finnas.
Det skall vara möjligt att sortera medlemslistan i följande ordningar:

• I ordningen de finns i databasen (default)
• Alfabetisk ordning på namnen från A till Ö
• Alfabetisk ordning på namnen från Ö till A
Ändra uppgifter om en medlem:
• Det skall finnas ett formulär med medlemmens nuvarande information ifyllt.
• När formuläret sparas skall medlemmens information i databasen uppdateras.
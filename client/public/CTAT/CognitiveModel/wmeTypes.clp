(deftemplate MAIN::hint 
   (slot now))
(deftemplate MAIN::problem 
   (slot name) 
   (multislot interface-elements) 
   (multislot subgoals) 
   (slot done) 
   (slot description))

; tell productionRules file that templates have been parsed
(provide wmeTypes)

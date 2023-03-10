
(require* wmeTypes "wmeTypes.clp")
;https://stackoverflow.com/questions/19042218/jess-multislot-questions
;



;verificar esta secciòn
(deftemplate ecuaciond (slot e1)(multislot valores))
(deftemplate ecuacion (slot valor (type INTEGER)))
(deffacts init 
	(ecuaciond (e1 derecho) (valores x ))
	(ecuaciond (e1 derecho2) (valores 3x - 4  ))
 )



(defrule change_valuesd
    (ecuaciond (e1 ?ex) (valores $? x  $? ))
=>
(printout t "en el lado "  ?ex " hay que pasar valores al otro miembro." crlf)

)


(deftemplate ecuacioni (slot e2)(multislot valores1))

(deffacts init 
	(ecuacioni (e2 izquierdo) (valores1 7 x  +  2))
	
 )

;comprobar si se puede realizar a valores enteros

;para comprobar si los valores de suma son correctos
(deffunction sumar_values (?a ?b ?c)
     (bind ?r (+ ?a ?b ?c))
    (printout t ?r crlf)
    (return ?r)
)
(sumar_values 20 15 6)



(deffacts introducir-datos
	(ecuacion (valor 20))
    (ecuacion (valor 15))
    (ecuacion (valor 41))
    
)

(bind ?t (assert (ecuacion (valor 10)) ) )

;suma de valores
(deffunction sumAll($?args)
    (eval (str-cat "(+ " (implode$ ?args) ")" )))


(deffunction sumAll($?args)
    (bind ?sum 0)
    (foreach ?num ?args
        (bind ?sum (+ ?sum ?num))
    )
    (printout t ?sum " es el total." crlf)
)
(bind $?valores-lista (create$ 4 5 7)) ; se crea la lista dentro de una variable
(sumAll $?valores-lista )
;comprobaar si los valores de resta son correctos



; resta de valores
(deffunction subsAll($?args)
    (bind ?sum 0)
    (foreach ?num ?args
        (bind ?sum (- ?sum ?num))
    )
    (printout t ?sum " es el total." crlf)
)
(sumAll 8 -2 -2  )
;multiplicacion de valores
(deffunction multyAll($?args)
    (bind ?sum 1)
    (foreach ?num ?args
        (bind ?sum (* ?sum ?num))
    )
    (printout t ?sum " es el total." crlf)
)
(multyAll 8 2 -2  ) ;los valores que se encuentran en esta funcion deben ser primero + -

;cambia el valor al cambiar el termino

(defrule change_valuesi
	(ecuacioni (e2 ?ex) (valores1 $? 7 $?))
=>
(printout t "en el lado "  ?ex " hay que pasar valores al otro miembro." crlf)

)

(reset)
(run)
(clear)
;Functions



(deffunction cambio_signo (?x)
     (bind ?w -1)
    (bind ?l (*  ?x ?w))
    
    (printout t ?l crlf)
)

;(predict-observable-action ?entradalbd "UpdateTable" (eval cambio_signo -20) )
(cambio_signo -20)




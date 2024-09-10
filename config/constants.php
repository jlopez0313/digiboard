<?php

return [
    
    'estados' => [
        [
            'key' => 'A',
            'valor' => 'Activo'
        ],
        [
            'key' => 'I',
            'valor' => 'Inactivo'
        ],
    ],
    'tipo_respuesta' => [
        [
            'id' => '1',
            'tipo' => 'SI - NO',
            'respuestas' => [
                [
                    'id' => 'S',
                    'respuesta' => 'SI'
                ],
                [
                    'id' => 'N',
                    'respuesta' => 'NO'
                ]
            ]
        ],
        [
            'id' => '2',
            'tipo' => 'Selección Multiple - Unica Respuesta',
            'respuestas' => [
                [
                    'id' => 'E',
                    'respuesta' => 'Excelente'
                ],
                [
                    'id' => 'B',
                    'respuesta' => 'Bueno'
                ],
                [
                    'id' => 'R',
                    'respuesta' => 'Regular'
                ],
                [
                    'id' => 'M',
                    'respuesta' => 'Malo'
                ]
            ]
        ],
    ]
];

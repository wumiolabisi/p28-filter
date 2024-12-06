<?php

use PHPUnit\Framework\TestCase;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Brain\Monkey;




/**
 * Tests de la méthode p28_get_caracteristics() de la classe P28_Filter
 * 
 */
class P28GetCaracteristicsTest extends TestCase
{

    // Adds Mockery expectations to the PHPUnit assertions count.
    use MockeryPHPUnitIntegration;
    // Initialise Brain Monkey
    protected function setUp(): void
    {
        parent::setUp();
        Monkey\setUp();
    }
    // Nettoie Brain Monkey
    protected function tearDown(): void
    {
        Monkey\tearDown();
        parent::tearDown();
    }


    /**
     * Lorsque la méthode retourne un tableau
     */
    public function test_p28_get_caracteristics_when_queried_object_is_array()
    {

        $mock_queried_object = [
            'term_id' => 42,
            'name'    => 'Oeuvre',
            'slug'    => 'oeuvre',
        ];

        Monkey\Functions\expect('get_queried_object')
            ->once()
            ->andReturn($mock_queried_object);


        // Appelle la fonction que nous testons
        $result = P28_Filter::get_instance()->p28_get_caracteristics();

        // Vérifie que le résultat est le titre attendu
        $this->assertEquals(42, $result['term_id']);
        $this->assertEquals('Oeuvre', $result['name']);
        $this->assertEquals('oeuvre', $result['slug']);
    }
    /**
     * Lorsque la méthode retourne un objet
     */
    public function test_p28_get_caracteristics_when_queried_object_is_object()
    {

        $mock_queried_object = (object) [
            'term_id' => 42,
            'name'    => 'Oeuvre',
            'slug'    => 'oeuvre',
        ];

        Monkey\Functions\expect('get_queried_object')
            ->once()
            ->andReturn($mock_queried_object);

        $result = P28_Filter::get_instance()->p28_get_caracteristics();


        $this->assertEquals(42, $result->term_id);
        $this->assertEquals('Oeuvre', $result->name);
        $this->assertEquals('oeuvre', $result->slug);
    }

    /**
     * Lorsque l'objet à retourner est null
     */
    public function test_p28_get_caracteristics_when_queried_object_does_not_exists()
    {

        $mock_queried_object = null;

        Monkey\Functions\expect('get_queried_object')
            ->once()
            ->andReturn($mock_queried_object);


        $result = P28_Filter::get_instance()->p28_get_caracteristics();


        $this->assertEquals(null, $result);
    }
    /**
     * Lorsque l'objet requêté est vide
     */
    public function test_p28_get_caracteristics_when_object_is_empty()
    {
        $mock_queried_object = (object) [];

        Monkey\Functions\expect('get_queried_object')
            ->once()
            ->andReturn($mock_queried_object);

        $result = P28_Filter::get_instance()->p28_get_caracteristics();



        $this->assertEquals((object) [], $result);
    }
    /**
     * Lorsque l'objet requêté est incomplet
     */
    public function test_p28_get_caracteristics_when_array_is_incomplete()
    {
        $mock_queried_object = ['term_id' => 42];

        Monkey\Functions\expect('get_queried_object')
            ->once()
            ->andReturn($mock_queried_object);

        $result = P28_Filter::get_instance()->p28_get_caracteristics();


        $this->assertEquals(42, $result['term_id']);
        $this->assertArrayNotHasKey('name', $result);
        $this->assertArrayNotHasKey('slug', $result);
    }
}

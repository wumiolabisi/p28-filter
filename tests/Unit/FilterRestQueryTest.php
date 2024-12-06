<?php

use PHPUnit\Framework\TestCase;
use Brain\Monkey;


/**
 * Tests de la méthode p28_get_caracteristics() de la classe P28_Filter
 * 
 */
class FilterRestQueryTest extends TestCase
{

    protected function setUp(): void
    {
        parent::setUp();
        Monkey\setUp();
    }
    protected function tearDown(): void
    {
        Monkey\tearDown();
        parent::tearDown();
        Mockery::close();
    }


    /**
     * Tester le comportement si $args et $request sont null ou empty
     */
    public function test_filter_rest_query_when_all_args_are_null_or_empty()
    {
        $mock_request = Mockery::mock('WP_REST_Request');
        $mock_request->shouldReceive('get_params')
            ->once()
            ->andReturn([]);

        $mock_instance = Mockery::mock('P28_Filter')->makePartial();

        $mock_instance->shouldReceive('filterable_taxonomies')
            ->with($mock_request)
            ->once()
            ->andReturn([]);

        $mock_instance->shouldReceive('filterable_acf_fields')
            ->with($mock_request)
            ->once()
            ->andReturn([]);


        $args = [];

        $expected = ["relation" => "AND"];

        $result = $mock_instance->filter_rest_query($args, $mock_request);
        $expected = ['relation' => 'AND'];

        $this->assertArrayHasKey('tax_query', $result, 'Le tableau devrait contenir la clé tax_query');
        $this->assertIsArray($result['tax_query'], 'Le contenu du tableau tax_query devrait être un tableau');
        $this->assertEquals('AND', $result['tax_query']['relation'], 'La valeur attendue devrait être AND.');

        $this->assertArrayHasKey('meta_query', $result, 'Le tableau devrait contenir la clé meta_query');
        $this->assertIsArray($result['meta_query'], 'Le contenu du tableau meta_query devrait être un tableau');
        $this->assertEquals('AND', $result['meta_query']['relation'], 'La valeur attendue devrait être AND.');
    }
}
